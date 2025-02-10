'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { faBarChart, faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

export default function Dashboard() {
    const [exampleReport, setExampleReport] = useState([
        { label: "Total MSISDNs (n)", value: "8,500" },
        { label: "Completed Lookups", value: "8,500 (100%)" },
        { label: "Pending Lookups", value: "0 (0%)" },
        { label: "First Lookup", value: "2020-08-11 23:59:38.490+0300" },
        { label: "Last Result", value: "2020-08-12 00:01:23.227+0300" },
        { label: "Performance", value: "4,065 seconds total at 42.09 results per second." },
        { label: "Cost", value: "84.98 EUR" }
    ]);

    const mobileNetworkData = [
        { name: "HLR", value: 200 },
        { name: "DNCR", value: 350 },
    ];

    const connectivityData = [
        { name: "CONNECTED", value: 4534 },
        { name: "ABSENT", value: 415 },
        { name: "INVALID MSISDN", value: 334 },
        { name: "UNKNOWN", value: 115 },
    ];
    const connectivityColors = ["#28a745", "#ffc107", "#dc3545", "#6c757d"];
    
    const connectivityData2 = [
        { name: "COMPLETED", value: 8426 },
        { name: "FAILED", value: 74 },
    ];
    const connectivityColors2 = ["#28a745", "#ffc107", "#dc3545", "#6c757d"];

    const processingRadarData = [
        { subject: "CONNECTED", A: 85, fullMark: 100 },
        { subject: "ABSENT", A: 10, fullMark: 100 },
        { subject: "INVALID MSISDN", A: 55, fullMark: 100 },
        { subject: "UNDETERMINED", A: 5, fullMark: 100 },
        { subject: "NO RESULT", A: 5, fullMark: 100 },
    ];
    const processingRadarData2 = [
        { subject: "COMPLETED", A: 85, fullMark: 100 },
        { subject: "QUEUED", A: 2, fullMark: 100 },
        { subject: "PROCESSING", A: 2, fullMark: 100 },
        { subject: "REJECTED", A: 2, fullMark: 100 },
        { subject: "FAILED", A: 2, fullMark: 100 },
    ];

    const imsiData = [
        { name: "LynxMobile", Ported: 50, Roaming: 10 },
        { name: "Soft", Ported: 200, Roaming: 50 },
        { name: "Services", Ported: 300, Roaming: 70 },
        { name: "Provider", Ported: 250, Roaming: 90 },
        { name: "N/A", Ported: 100, Roaming: 30 },
    ];
    return (
        <>
            <Header
                buttons={
                    <>
                      <a href="/user/dashboard" className="btn btn-outline-primary me-2">
                        Dashboard
                      </a>
                      <a href="/user/lookup" className="btn btn-outline-primary me-2">
                        Lookup
                      </a>
                      <button className="btn btn-primary">
                        Logout
                      </button>
                    </>
                }
            />
            <div className="container">
                <h1 className="text-center mb-4">Example Report (HLR)</h1>
                <section>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Image
                                src="/images/chart-bar-solid.svg"
                                alt="Example Report"
                                width={18}
                                height={18}
                            />
                            <strong>&nbsp;HLR-EXAMPLE-REPORT</strong>
                        </li>
                        {exampleReport.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <div className="row">
                                    <div className="col">
                                        <span>{item.label}</span>
                                    </div>
                                    <div className="col">
                                        <span>{item.value}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                        <div className="mt-3">
                            <button className="btn btn-primary me-2">
                                <FontAwesomeIcon style={{ fontSize: "1em" }} icon={faPrint} />
                                <span>&nbsp;Print Version</span>
                            </button>
                            <button className="btn btn-primary">
                                <FontAwesomeIcon style={{ fontSize: "1em" }} icon={faDownload} />
                                <span>&nbsp;CSV Report</span>
                            </button>
                        </div>
                    </ul>
                </section>
                {/* Pie Chart - Mobile Network Operators */}
                <section className="mt-4">
                    <h2 className="text-center">Mobile Network Operators</h2>
                    <p>The analysis detected 5 mobile network operators. Swisscom (CH) leads with 4,766 (56%) MSISDNs, followed by Sunrise (CH) with 3,447 (41%) and Salt (CH) with 238 (3%).</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mobileNetworkData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>

                {/* Pie Chart - Connectivity Statuses */}
                <section className="mt-4">
                    <h2 className="text-center">Connectivity Statuses</h2>
                    <p>This sample includes 8,500 MSISDNs: 4,334 (51%) are connected and reachable, 744 (9%) are valid but currently absent, 3,307 (39%) are invalid, and 115 (1%) encountered errors. None are still being processed.</p>
                    <div className="row">
                        <div className="col-6">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={connectivityData} dataKey="value" nameKey="name" outerRadius={100} label>
                                        {connectivityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={connectivityColors[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="col-6">
                            {/* Radar Chart */}
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart outerRadius={90} data={processingRadarData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Processing" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>
                
                {/* Pie Chart - Connectivity Statuses by Mobile Network Operator */}
                <section className="mt-4">
                    <h2 className="text-center">Connectivity Statuses by Mobile Network Operator</h2>
                    <p>This section details connectivity by operator. Swisscom had the most connected subscribers with 2,363 MSISDNs (50% extraction rate) and the highest absent subscribers at 721 MSISDNs (15%).</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={imsiData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Ported" fill="#17a2b8" />
                            <Bar dataKey="Roaming" fill="#e83e8c" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>
                
                {/* Pie Chart - Processing Statuses */}
                <section className="mt-4">
                    <h2 className="text-center">Processing Statuses</h2>
                    <p>All 8,500 MSISDNs have been processed, with 8,426 (99%) receiving valid HLR/MNP responses. No queries were rejected, and 74 (1%) failed due to errors.</p>
                    <div className="row">
                        <div className="col-6">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={connectivityData2} dataKey="value" nameKey="name" outerRadius={100} label>
                                        {connectivityData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={connectivityColors2[index]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="col-6">
                            {/* Radar Chart */}
                            <ResponsiveContainer width="100%" height={300}>
                                <RadarChart outerRadius={90} data={processingRadarData2}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis />
                                    <Radar name="Processing" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                {/* Bar Chart - IMSI, MSCs, Ported & Roaming Data */}
                <section className="mt-4">
                    <h2 className="text-center">IMSIs, MSCs, Ported and Roaming Data per Mobile Network Operator</h2>
                    <p>N/A and Lycamobile had a 0% IMSI and MSC extraction rate for 18 and 31 MSISDNs, respectively. For Salt, 100% of 238 MSISDNs were ported, totaling 237 numbers.</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={imsiData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Ported" fill="#17a2b8" />
                            <Bar dataKey="Roaming" fill="#e83e8c" />
                        </BarChart>
                    </ResponsiveContainer>
                </section>
            </div>
            <Footer />
        </>
    )
}