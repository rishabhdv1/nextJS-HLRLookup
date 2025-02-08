'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { faBarChart, faDownload, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
                      <a href="/dashboard" className="btn btn-outline-primary me-2">
                        Dashboard
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
                            <FontAwesomeIcon style={{ fontSize: "1em" }} icon={faBarChart} />
                            <strong>&nbsp;HLR-EXAMPLE-REPORT</strong>
                        </li>
                        {exampleReport.map((item, index) => (
                            <li className="list-group-item">
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
                    <p>The analyzed data contains a total of 5 distinct mobile network operators (MNOs). Swisscom (CH) has been detected the most with 4,766 (56 %) MSISDNs belonging to this network. It's followed by Sunrise (CH) with 3,447 (41 %) MSISDNs and Salt (CH) in third place with a total of 238 (3 %) detected MSISDNs.</p>
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
                    <p>This sample contains 8500 MSISDNs. 4334 (51%) out of these numbers mobile phone numbers are connected to their mobile network and currently reachable. 744 (9%) of the mobile phone numbers are valid but currently absent (e.g. the target device is switched off or out of network reach). 3307 (39) MSISDNs returned as invalid numbers and 115 (1%) of numbers ran into an exception or another kind of error and their connectivity status could not be determined. 0 (0%) of the MSISDNs are still queued on currently being processed.</p>
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
                    <p>This section describes the connectivity status distribution by mobile network operator. The most connected subscribers were detected on the Swisscom network with 2,363 MSISDNs or an extraction rate of 50%. The highest number of absent subscribers was at Swisscom with 721 MSISDNs disconnected or 15% of all Swisscom MSISDNs.</p>
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
                    <p>This sample contains 8,500 MSISDNs. 8,500 (100%) of those have mobile phone numbers have been processed. 0 (0%) lookups are still queued or being processed. 8,426 (99%) lookups have have received a valid response from the HLR (or MNP DB) while 0 (0%) queries have been rejected without charge (because the numbers were invalid or due to lack of network connectivity to the target operator). 74 (1%) of the lookups have failed due to an error or other exception.</p>
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
                    <p>N/A had an extraction rate of 0 % for IMSIs. That's 0 IMSIs for 18 submitted MSISDNs. 0 MSCs could be extracted for Lycamobile, which equals an extraction rate of 0 % for 31 submitted MSISDNs and out of 238 MSISDNs belonging to Salt 100 % were ported. That is 237 numbers overall.</p>
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