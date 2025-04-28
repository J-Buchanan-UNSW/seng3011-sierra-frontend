import { retrievalJSONEndpoint } from "./api";
import lookup from "country-code-lookup";

export const getStatNames = () => {
    const statDisplayNames = {
        "AIRPOLLUTANTS_INDIRECT": { displayName: "Air Pollutants (Indirect)", type: "lower", pillar: "E" },
        "AIRPOLLUTANTS_DIRECT": { displayName: "Air Pollutants (Direct)", type: "lower", pillar: "E" },
        "WATERWITHDRAWALTOTAL": { displayName: "Water Withdrawal Total", type: "lower", pillar: "E" },
        "PARTICULATE_MATTER_EMISSIONS": { displayName: "Particulate Matter Emissions", type: "lower", pillar: "E" },
        "CO2INDIRECTSCOPE2": { displayName: "CO₂ Scope 2 (Indirect)", type: "lower", pillar: "E" },
        "CO2INDIRECTSCOPE3": { displayName: "CO₂ Scope 3 (Indirect)", type: "lower", pillar: "E" },
        "CO2DIRECTSCOPE1": { displayName: "CO₂ Scope 1 (Direct)", type: "lower", pillar: "E" },
        "CO2_NO_EQUIVALENTS": { displayName: "CO₂ Equivalents", type: "lower", pillar: "E" },
        "NOXEMISSIONS": { displayName: "NOₓ Emissions", type: "lower", pillar: "E" },
        "VOCEMISSIONS": { displayName: "VOC Emissions", type: "lower", pillar: "E" },
        "SOXEMISSIONS": { displayName: "SOₓ Emissions", type: "lower", pillar: "E" },
        "WATER_USE_PAI_M10": { displayName: "Water Use (PAI M10)", type: "lower", pillar: "E" },
        "HAZARDOUSWASTE": { displayName: "Hazardous Waste", type: "lower", pillar: "E" },
        "WASTETOTAL": { displayName: "Total Waste", type: "lower", pillar: "E" },
        "NATURAL_RESOURCE_USE_DIRECT": { displayName: "Natural Resource Use (Direct)", type: "lower", pillar: "E" },
        "ENERGYUSETOTAL": { displayName: "Total Energy Use", type: "lower", pillar: "E" },
        "HUMAN_RIGHTS_VIOLATION_PAI": { displayName: "Human Rights Violations (PAI)", type: "lower", pillar: "S" },
        "LOSTWORKINGDAYS": { displayName: "Lost Working Days", type: "lower", pillar: "S" },
        "ANALYTICNONAUDITAUDITFEESRATIO": { displayName: "Non-Audit to Audit Fees Ratio", type: "lower", pillar: "G" },
        "ANNUAL_MEDIAN_COMPENSATION": { displayName: "Annual Median Compensation", type: "lower", pillar: "G" },
        "CEO_ANNUAL_COMPENSATION": { displayName: "CEO Annual Compensation", type: "lower", pillar: "G" },
        "CEO_PAY_RATIO_MEDIAN": { displayName: "CEO Pay Ratio (Median)", type: "lower", pillar: "G" },
        "ENV_INVESTMENTS": { displayName: "Environmental Investments", type: "higher", pillar: "E" },
        "WASTE_RECYCLED": { displayName: "Waste Recycled", type: "higher", pillar: "E" },
        "WASTE_REDUCTION_TOTAL": { displayName: "Total Waste Reduction", type: "higher", pillar: "E" },
        "AUDITCOMMNONEXECMEMBERS": { displayName: "Audit Committee (Non-Exec Members)", type: "higher", pillar: "G" },
        "COMPCOMMNONEXECMEMBERS": { displayName: "Compensation Committee (Non-Exec Members)", type: "higher", pillar: "G" },
        "ANALYTICAUDITCOMMIND": { displayName: "Audit Committee Independence", type: "higher", pillar: "G" },
        "ANALYTICBOARDFEMALE": { displayName: "Female Board Members", type: "higher", pillar: "G" },
        "ANALYTICCOMPCOMMIND": { displayName: "Compensation Committee Independence", type: "higher", pillar: "G" },
        "ANALYTICINDEPBOARD": { displayName: "Independent Board Members", type: "higher", pillar: "G" },
        "ANALYTICNOMINATIONCOMMIND": { displayName: "Nomination Committee Independence", type: "higher", pillar: "G" },
        "ANALYTICNONEXECBOARD": { displayName: "Non-Executive Board Members", type: "higher", pillar: "G" },
        "ANALYTICQMS": { displayName: "Quality Management System", type: "higher", pillar: "G" },
        "ANALYTICWASTERECYCLINGRATIO": { displayName: "Waste Recycling Ratio", type: "higher", pillar: "G" },
        "ANALYTIC_AUDIT_COMM_EXPERTISE": { displayName: "Audit Committee Expertise", type: "higher", pillar: "G" },
        "ANALYTIC_VOTING_RIGHTS": { displayName: "Voting Rights", type: "higher", pillar: "G" },
        "BOARDMEETINGATTENDANCEAVG": { displayName: "Board Meeting Attendance", type: "higher", pillar: "G" },
        "COMMMEETINGSATTENDANCEAVG": { displayName: "Committee Meeting Attendance", type: "higher", pillar: "G" },
        // Binary metrics
        "BRIBERY_AND_CORRUPTION_PAI_INSUFFICIENT_ACTIONS": { displayName: "Bribery & Corruption (Insufficient Actions)", type: "binary", pillar: "S" },
        "TOXIC_CHEMICALS_REDUCTION": { displayName: "Toxic Chemicals Reduction", type: "binary", pillar: "E" },
        "N_OXS_OX_EMISSIONS_REDUCTION": { displayName: "NOₓ/SOₓ Emissions Reduction", type: "binary", pillar: "E" },
        "VOC_EMISSIONS_REDUCTION": { displayName: "VOC Emissions Reduction", type: "binary", pillar: "E" },
        "ECO_DESIGN_PRODUCTS": { displayName: "Eco-Design Products", type: "binary", pillar: "E" },
        "POLICY_EMISSIONS": { displayName: "Emissions Policy", type: "binary", pillar: "E" },
        "POLICY_SUSTAINABLE_PACKAGING": { displayName: "Sustainable Packaging Policy", type: "binary", pillar: "E" },
        "POLICY_WATER_EFFICIENCY": { displayName: "Water Efficiency Policy", type: "binary", pillar: "E" },
        "RENEWENERGYCONSUMED": { displayName: "Renewable Energy Consumed", type: "binary", pillar: "E" },
        "RENEWENERGYPRODUCED": { displayName: "Renewable Energy Produced", type: "binary", pillar: "E" },
        "RENEWENERGYPURCHASED": { displayName: "Renewable Energy Purchased", type: "binary", pillar: "E" },
        "SUSTAINABLE_BUILDING_PRODUCTS": { displayName: "Sustainable Building Products", type: "binary", pillar: "E" },
        "TAKEBACK_RECYCLING_INITIATIVES": { displayName: "Takeback & Recycling Initiatives", type: "binary", pillar: "E" },
        "TARGETS_EMISSIONS": { displayName: "Emissions Targets", type: "binary", pillar: "E" },
        "TARGETS_WATER_EFFICIENCY": { displayName: "Water Efficiency Targets", type: "binary", pillar: "E" },
        "TRANALYTICRENEWENERGYUSE": { displayName: "Analytic Renewable Energy Use", type: "binary", pillar: "E" },
        "WATER_TECHNOLOGIES": { displayName: "Water Technologies", type: "binary", pillar: "E" },
        "EMPLOYEE_HEALTH_SAFETY_POLICY": { displayName: "Employee Health & Safety Policy", type: "binary", pillar: "S" },
        "IMPROVEMENT_TOOLS_BUSINESS_ETHICS": { displayName: "Business Ethics Tools", type: "binary", pillar: "S" },
        "POLICY_BOARD_DIVERSITY": { displayName: "Board Diversity Policy", type: "binary", pillar: "S" },
        "POLICY_BRIBERYAND_CORRUPTION": { displayName: "Anti-Bribery Policy", type: "binary", pillar: "S" },
        "POLICY_BUSINESS_ETHICS": { displayName: "Business Ethics Policy", type: "binary", pillar: "S" },
        "POLICY_CHILD_LABOR": { displayName: "Child Labor Policy", type: "binary", pillar: "S" },
        "POLICY_DATA_PRIVACY": { displayName: "Data Privacy Policy", type: "binary", pillar: "S" },
        "POLICY_FORCED_LABOR": { displayName: "Forced Labor Policy", type: "binary", pillar: "S" },
        "POLICY_HUMAN_RIGHTS": { displayName: "Human Rights Policy", type: "binary", pillar: "S" },
        "SUPPLY_CHAINHS_POLICY": { displayName: "Supply Chain Health & Safety Policy", type: "binary", pillar: "S" },
        "CONFORMANCE_OECD_MNE": { displayName: "OECD MNE Conformance", type: "binary", pillar: "S" },
        "CONFORMANCE_UN_GUID": { displayName: "UN Guidelines Conformance", type: "binary", pillar: "S" },
        "DAY_CARE_SERVICES": { displayName: "Day Care Services", type: "binary", pillar: "S" },
        "GRIEVANCE_REPORTING_PROCESS": { displayName: "Grievance Reporting Process", type: "binary", pillar: "S" },
        "HUMAN_RIGHTS_CONTRACTOR": { displayName: "Human Rights in Contractors", type: "binary", pillar: "S" },
        "HUMAN_RIGHTS_POLICY_DUEDILIGENCE": { displayName: "Human Rights Due Diligence", type: "binary", pillar: "S" },
        "ISO14000": { displayName: "ISO 14000 Certified", type: "binary", pillar: "S" },
        "LABELED_WOOD": { displayName: "Labeled Wood Products", type: "binary", pillar: "S" },
        "POLICY_FREEDOMOF_ASSOCIATION": { displayName: "Freedom of Association Policy", type: "binary", pillar: "S" },
        "TARGETS_DIVERSITY_OPPORTUNITY": { displayName: "Diversity Opportunity Targets", type: "binary", pillar: "S" },
        "TRADEUNIONREP": { displayName: "Trade Union Representation", type: "binary", pillar: "S" },
        "WHISTLEBLOWER_PROTECTION": { displayName: "Whistleblower Protection", type: "binary", pillar: "S" },
        "ANALYTIC_ANTI_TAKEOVER_DEVICES": { displayName: "Anti-Takeover Devices", type: "binary", pillar: "G" },
        "CALL_MEETINGS_LIMITED_RIGHTS": { displayName: "Limited Rights to Call Meetings", type: "binary", pillar: "G" },
        "CSR_REPORTING_EXTERNAL_AUDIT": { displayName: "CSR Reporting (External Audit)", type: "binary", pillar: "G" },
        "CSR_REPORTINGGRI": { displayName: "CSR Reporting (GRI)", type: "binary", pillar: "G" },
        "CSR_REPORTINGISO26000": { displayName: "CSR Reporting (ISO 26000)", type: "binary", pillar: "G" },
        "ANALYTICCEO_CHAIRMAN_SEPARATION": { displayName: "CEO/Chairman Separation", type: "binary", pillar: "G" },
        "GLOBAL_COMPACT": { displayName: "UN Global Compact Signatory", type: "binary", pillar: "G" }
    };
    return statDisplayNames;
}

export const calculateScores = (companyData: any, maxValues: any) => {
    const lowerIsBetterMetrics = new Set([
        "AIRPOLLUTANTS_INDIRECT", "AIRPOLLUTANTS_DIRECT", "WATERWITHDRAWALTOTAL", "PARTICULATE_MATTER_EMISSIONS",
        "CO2INDIRECTSCOPE2", "CO2INDIRECTSCOPE3", "CO2DIRECTSCOPE1", "CO2_NO_EQUIVALENTS", "NOXEMISSIONS",
        "VOCEMISSIONS", "SOXEMISSIONS", "WATER_USE_PAI_M10", "HAZARDOUSWASTE", "WASTETOTAL", "NATURAL_RESOURCE_USE_DIRECT",
        "ENERGYUSETOTAL",

        "BRIBERY_AND_CORRUPTION_PAI_INSUFFICIENT_ACTIONS", "HUMAN_RIGHTS_VIOLATION_PAI", "LOSTWORKINGDAYS",

        "ANALYTICNONAUDITAUDITFEESRATIO", "ANNUAL_MEDIAN_COMPENSATION", "CEO_ANNUAL_COMPENSATION",
        "CEO_PAY_RATIO_MEDIAN"
    ]);

    const higherIsBetterMetrics = new Set([
        "ENV_INVESTMENTS", "WASTE_RECYCLED", "WASTE_REDUCTION_TOTAL",

        "AUDITCOMMNONEXECMEMBERS", "COMPCOMMNONEXECMEMBERS", "ANALYTICAUDITCOMMIND", "ANALYTICBOARDFEMALE",
        "ANALYTICCOMPCOMMIND", "ANALYTICINDEPBOARD", "ANALYTICNOMINATIONCOMMIND", "ANALYTICNONEXECBOARD",
        "ANALYTICQMS", "ANALYTICWASTERECYCLINGRATIO", "ANALYTIC_AUDIT_COMM_EXPERTISE", "ANALYTIC_VOTING_RIGHTS",
        "BOARDMEETINGATTENDANCEAVG", "COMMMEETINGSATTENDANCEAVG"
    ])

    const binaryMetrics = new Set([
        "TOXIC_CHEMICALS_REDUCTION", "N_OXS_OX_EMISSIONS_REDUCTION", "VOC_EMISSIONS_REDUCTION", "ECO_DESIGN_PRODUCTS",
        "POLICY_EMISSIONS", "POLICY_SUSTAINABLE_PACKAGING", "POLICY_WATER_EFFICIENCY", "RENEWENERGYCONSUMED",
        "RENEWENERGYPRODUCED", "RENEWENERGYPURCHASED", "SUSTAINABLE_BUILDING_PRODUCTS", "TAKEBACK_RECYCLING_INITIATIVES",
        "TARGETS_EMISSIONS", "TARGETS_WATER_EFFICIENCY", "TRANALYTICRENEWENERGYUSE", "WATER_TECHNOLOGIES",

        "EMPLOYEE_HEALTH_SAFETY_POLICY", "IMPROVEMENT_TOOLS_BUSINESS_ETHICS",
        "POLICY_BOARD_DIVERSITY", "POLICY_BRIBERYAND_CORRUPTION", "POLICY_BUSINESS_ETHICS", "POLICY_CHILD_LABOR",
        "POLICY_DATA_PRIVACY", "POLICY_FORCED_LABOR", "POLICY_HUMAN_RIGHTS", "SUPPLY_CHAINHS_POLICY",
        "CONFORMANCE_OECD_MNE", "CONFORMANCE_UN_GUID", "DAY_CARE_SERVICES", "GRIEVANCE_REPORTING_PROCESS",
        "HUMAN_RIGHTS_CONTRACTOR", "HUMAN_RIGHTS_POLICY_DUEDILIGENCE", "ISO14000", "LABELED_WOOD",
        "POLICY_FREEDOMOF_ASSOCIATION", "TARGETS_DIVERSITY_OPPORTUNITY", "TRADEUNIONREP",
        "WHISTLEBLOWER_PROTECTION",

        "ANALYTIC_ANTI_TAKEOVER_DEVICES", "CALL_MEETINGS_LIMITED_RIGHTS", "CSR_REPORTING_EXTERNAL_AUDIT",
        "CSR_REPORTINGGRI", "CSR_REPORTINGISO26000", "ANALYTICCEO_CHAIRMAN_SEPARATION", "GLOBAL_COMPACT"
    ]);

    const finalCompanyData = {
        environmental: 0,
        social: 0,
        governance: 0
    };

    const pillarScores: { [pillar: string]: number[] } = {
        environmental: [],
        social: [],
        governance: []
    };

    // Step 3: Scoring each metric
    Object.values(companyData).forEach((metric: any) => {
        const { metric_name, metric_value, pillar } = metric;
        const value = parseFloat(metric_value);

        // Skip if no max value available
        if (maxValues[metric_name] == null || isNaN(value)) return;

        let normalized = 0;

        if (binaryMetrics.has(metric_name)) {
            normalized = value;
        } else if (lowerIsBetterMetrics.has(metric_name)) {
            normalized = 1 - (value / Math.max(1, maxValues[metric_name]));
        } else if (higherIsBetterMetrics.has(metric_name)) {
            normalized = value / Math.max(1, maxValues[metric_name]);
        } else {
            normalized = value / Math.max(maxValues[metric_name], 1);
        }

        // Clamp between 0 and 1
        normalized = Math.max(0, Math.min(1, normalized));
        // Push score into the correct pillar bucket
        if (['E', 'S', 'G'].includes(pillar)) {
            let key = null;
            if (pillar == 'E') {
                key = 'environmental'
            } else if (pillar == 'S') {
                key = 'social'
            } else if (pillar == 'G') {
                key = 'governance'
            }
            if (key) {
                pillarScores[key].push(normalized);
            }
        }
    });

    // Step 4: Average scores per pillar
    Object.keys(pillarScores).forEach(pillar => {
        const scores = pillarScores[pillar];
        if (scores.length > 0) {
            const avg = (scores.reduce((a, b) => a + b, 0) / scores.length) * 100;
            finalCompanyData[pillar as keyof typeof finalCompanyData] = parseInt(avg.toFixed(0));
        }
    });

    return finalCompanyData;
}

const fetchAllPaginated = async (baseUrl: string, pageSize = 5000) => {
    let allData: any[] = [];
    let currentPage = 1;
    let totalPages = 3;

    while (currentPage <= totalPages) {
        const pagedUrl = `${baseUrl}&page=${currentPage}&page_size=${pageSize}`;
        const response = await fetch(pagedUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch paginated data: ${response.status}`);
        }

        const result = await response.json();

        // Handle error responses or empty data
        if (result.error || result.status === "No content found") {
            break;
        }

        // Your Lambda returns data in a nested structure
        if (result.data && Array.isArray(result.data)) {
            allData.push(...result.data);
            // totalPages = result.total_pages || totalPages;
            console.log("Fetched page", currentPage, "of", totalPages);
            currentPage++;
        } else {
            // Unexpected format
            break;
        }
    }

    return allData;
};

export const getCountries = async () => {
    try {
        const baseUrl = `${retrievalJSONEndpoint}?columns=headquarter_country`;
        const data: any = await fetchAllPaginated(baseUrl);
        if (data.status == null) {
            const countries = [];
            const uniqueCountries = [...new Set(data.map((item: any) => item.headquarter_country))];
            for (let i = 0; i < uniqueCountries.length; i++) {
                if (uniqueCountries[i]) {
                    let countryData = {
                        name: uniqueCountries[i],
                        code: lookup.byCountry(uniqueCountries[i] as string)?.iso3 || ""
                    };
                    countries.push(countryData);
                }
            }
            return countries;
        }
        return [];
    } catch (error) {
        console.error("Error fetching country data:", error);
        return null;
    }
}

export const getCountryData = async (country: string) => {
    try {
        const baseUrl = `${retrievalJSONEndpoint}?filter=headquarter_country=="${encodeURIComponent(country)}"&columns=company_name,metric_name,metric_unit,metric_value,metric_year,pillar`;
        const data = await fetchAllPaginated(baseUrl);
        const companiesMap: any = {};
        let id = 0;
        data.forEach((entry: any) => {
            if (!companiesMap[entry.company_name]) {
                companiesMap[entry.company_name] = {
                    id: id++,
                    name: entry.company_name
                };
            }
            companiesMap[entry.company_name][entry.metric_name] = {
                metric_unit: entry.metric_unit,
                metric_value: entry.metric_value,
                metric_year: entry.metric_year,
                pillar: entry.pillar
            };
        });
        return companiesMap;
    } catch (error) {
        console.error("Error fetching country data:", error);
        return null;
    }
};

export const getCompanyByName = async (company: string) => {
    try {
        const baseUrl = `${retrievalJSONEndpoint}?filter=company_name=="${encodeURIComponent(company)}"&columns=company_name,metric_name,metric_unit,metric_value,metric_year,pillar`;
        const data = await fetchAllPaginated(baseUrl);

        const companyData: any = {};
        data.forEach((entry: any) => {
            companyData[entry.metric_name] = {
                metric_name: entry.metric_name,
                metric_unit: entry.metric_unit,
                metric_value: entry.metric_value,
                metric_year: entry.metric_year,
                pillar: entry.pillar
            };
        });

        const finalCompanyData = {
            name: company,
            stats: companyData,
            scores: calculateScores(companyData, await getMaxValues())
        };

        return finalCompanyData;
    } catch (error) {
        console.error("Error fetching company data:", error);
        return null;
    }
};

export const getMaxValues = async () => {
    try {
        const baseUrl = `${retrievalJSONEndpoint}?columns=company_name,metric_name,metric_unit,metric_value,metric_year,pillar,headquarter_country`;
        const data = await fetchAllPaginated(baseUrl);

        const maxValues: { [metricName: string]: number } = {};
        data.forEach((entry: any) => {
            const value = parseFloat(entry.metric_value);
            if (!isNaN(value)) {
                if (!maxValues[entry.metric_name] || value > maxValues[entry.metric_name]) {
                    maxValues[entry.metric_name] = value;
                }
            }
        });
        return maxValues;
    } catch (error) {
        console.error("Error fetching max values:", error);
        return null;
    }
};

export const getExtensiveCountries = async () => {
    try {
        const baseUrl = `${retrievalJSONEndpoint}?columns=company_name,metric_name,metric_unit,metric_value,metric_year,pillar,headquarter_country`;
        const data: any = await fetchAllPaginated(baseUrl);
        if (data.status == null) {
            const countryMap: any = {};
            const companyMap: any = {};
            let id = 0;

            // Calculate maxValues dynamically
            const maxValues: { [metricName: string]: number } = {};

            data.forEach((entry: any) => {
                // Track company and metric data
                if (companyMap[entry.company_name] == null) {
                    companyMap[entry.company_name] = {
                        "id": id,
                        "name": entry.company_name,
                        "country": entry.headquarter_country,
                    };
                    id += 1;
                }

                // Add metric data to company
                companyMap[entry.company_name][entry.metric_name] = {
                    "metric_name": entry.metric_name,
                    "metric_unit": entry.metric_unit,
                    "metric_value": entry.metric_value,
                    "metric_year": entry.metric_year,
                    "pillar": entry.pillar
                };

                // Update maxValues for each metric (calculate max dynamically)
                const value = parseFloat(entry.metric_value);
                if (!isNaN(value)) {
                    if (maxValues[entry.metric_name] == null || value > maxValues[entry.metric_name]) {
                        maxValues[entry.metric_name] = value;
                    }
                }
            });

            // Now calculate scores for each company
            Object.keys(companyMap).map((companyName) => {
                const company = companyMap[companyName];
                company["scores"] = calculateScores(company, maxValues); // Pass maxValues dynamically
            });

            // Group companies by country
            Object.values(companyMap).forEach((company: any) => {
                if (company.country) {
                    if (countryMap[company.country] == null) {
                        countryMap[company.country] = {
                            "name": company.country,
                            "code": lookup.byCountry(company.country as string)?.iso3 || "",
                            "totalScores": {
                                "environmental": 0,
                                "social": 0,
                                "governance": 0
                            },
                            "contributors" : {
                                "environmental": 0,
                                "social": 0,
                                "governance": 0
                            },
                            "companies": {}
                        };
                    }
                    countryMap[company.country]["companies"][company.name] = company;
                }
            });

            // Aggregate scores by country
            Object.keys(companyMap).map((companyName) => {
                if (companyMap[companyName].country && countryMap[companyMap[companyName].country]["totalScores"]) {
                    countryMap[companyMap[companyName].country]["totalScores"].environmental += companyMap[companyName]["scores"].environmental;
                    if (companyMap[companyName]["scores"].environmental) {
                        countryMap[companyMap[companyName].country]["contributors"].environmental += 1;
                    }
                    countryMap[companyMap[companyName].country]["totalScores"].social += companyMap[companyName]["scores"].social;
                    if (companyMap[companyName]["scores"].social) {
                        countryMap[companyMap[companyName].country]["contributors"].social += 1;
                    }
                    countryMap[companyMap[companyName].country]["totalScores"].governance += companyMap[companyName]["scores"].governance;
                    if (companyMap[companyName]["scores"].governance) {
                        countryMap[companyMap[companyName].country]["contributors"].governance += 1;
                    }
                }
            });

            // Calculate average scores for each country
            Object.keys(countryMap).map((country) => {
                const totalScore = countryMap[country]?.totalScores ?? {};
                const contributors = countryMap[country]?.contributors ?? {};
                countryMap[country]["scores"] = {};
                countryMap[country]["scores"]["environmental"] = parseInt((totalScore["environmental"] / Math.max(contributors["environmental"], 1)).toFixed(0));
                countryMap[country]["scores"]["social"] = parseInt((totalScore["social"] / Math.max(contributors["social"], 1)).toFixed(0));
                countryMap[country]["scores"]["governance"] = parseInt((totalScore["governance"] / Math.max(contributors["governance"], 1)).toFixed(0));
            });

            const companies = Object.values(companyMap);
            const countries = Object.values(countryMap);

            return {
                "countries": countries,
                "companies": companies,
                "maxValues": maxValues
            };
        }
        return [];
    } catch (error) {
        console.error("Error fetching country data:", error);
        return null;
    }
}