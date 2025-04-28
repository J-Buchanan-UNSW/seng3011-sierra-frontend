import countries from "world-countries"

const weatherApiEndpoint = "https://z6pi9exqh9.execute-api.us-west-2.amazonaws.com/prod"

export const getCountryWeather = async (countryCode: string) => {
    const found = countries.find((c) => {return c.cca3 == countryCode})
    if (found) {
        const lat = found.latlng[0].toString()
        const long = found.latlng[1].toString()
        const weatherUrl = `${weatherApiEndpoint}/getForecastData?longitude=${long}&latitude=${lat}`
        const response = await fetch(weatherUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.status}`);
        }

        let result: any = await response.text();
        result = result.replace(/\bNaN\b/g, 'null');
        result = JSON.parse(result);
        const now = new Date();
        const todayWeather = result.events.find((e: any) => {
            const eventDate = new Date(e.time_object.timestamp);
            return (
                eventDate.getFullYear() === now.getFullYear() &&
                eventDate.getMonth() === now.getMonth() &&
                eventDate.getDate() === now.getDate() &&
                eventDate.getHours() === now.getHours()
            );
        });
        if (todayWeather) {
            return todayWeather.attribute;
        }
        return null;
    }
    return null
}