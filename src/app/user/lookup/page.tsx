'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import countries from "@/helper/Countries";
import { useState } from "react";

export default function Lookup() {
    const [querySuccess, setQuerySuccess] = useState(true);
    const [hlrResults, setHlrResults] = useState([
        {name: 'Query successful', message: 'success'},
        {name: 'Nummer gultig', message: 'valid'},
        {name: 'Reachable', message: 'reachable'},
        {name: 'Ported', message: 'assumed_not_ported'},
        {name: 'Roaming', message: 'not_roaming'},
        {name: 'Landercode', message: 'IN'},
        {name: 'Landercode ISO3', message: ''},
    ]);
    const [networkOperator, setNetworkOperator] = useState([
        {name: 'Name', message: 'Reliance Jio Infocomm Ltd (RJIL)'},
        {name: 'MCC / MNC', message: '405863'},
        {name: 'Country', message: 'IN'},
    ]);
    const [format, setFormat] = useState([
        { international_format: '+919640562080', national_format: '096405 62080', country: 'India', iso_code: 'IN', country_prefix: '+91'},
    ]);
    const [ShowResult, setShowResult] = useState(true);
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
            <div className="container" style={{ minHeight: "100vh" }}>
                <section>
                    {/* <h2 className="text-center">Number Validation</h2> */}
                    <div className="card mt-4">
                        <div className="card-header">
                            <h2 className="text-center">Number Validation</h2>
                        </div>
                        <div className="card-body">
                            {/* <p>Verify mobile numbers for correctness and network membership. MNP lookup checks network affiliation but not validity, while HLR lookup confirms number existence and more.</p> */}
                            <div className="">
                                <label htmlFor="lookup_type">
                                    <strong>Lookup Type:</strong>
                                </label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label className="form-check-label">HLR</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label">DNCR</label>
                                </div>
                            </div>
                            <form action="">
                                <label htmlFor="phone_number">
                                    <strong>Phone Number:</strong>
                                </label><br/>
                                <input type="number" placeholder="Please Enter Your Number..." className="form-control" />
                                <button type="submit" className="btn btn-primary mt-3">Start Query</button>
                            </form>
                        </div>
                    </div>

                    {ShowResult && (
                        <div className="card mt-4 mb-4">
                            <div className="card-header">
                                <h5 className="float-start m-0">Results:</h5>
                                <span className={`badge float-end ${querySuccess ? 'bg-success' : 'bg-danger'}`}>
                                    {querySuccess ? 'Query Successfull' : 'Query Failed'}
                                </span>
                            </div>
                            <div className="card-body">
                                <section className="mb-4">
                                    {/* Results: */}
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>International format</th>
                                                <th>National format</th>
                                                <th>Country</th>
                                                <th>ISO Code</th>
                                                <th>Country prefix</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {format.map((item, index) => {
                                                const countryData = countries.find(country => country.name === item.country);
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.international_format}</td>
                                                        <td>{item.national_format}</td>
                                                        <td>
                                                            {countryData && (
                                                                <img 
                                                                    src={countryData.flagUrl} 
                                                                    alt={item.country} 
                                                                    width="24" 
                                                                    height="16" 
                                                                    className="me-2"
                                                                />
                                                            )}
                                                            {item.country}
                                                        </td>
                                                        <td>{item.iso_code}</td>
                                                        <td>{item.country_prefix}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </section>
                                <section className="mb-4">
                                    {/* HLR */}
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong>HLR:</strong>
                                        </li>
                                        {hlrResults.map((item, index) => (
                                            <li key={index} className="list-group-item">
                                                <div className="row">
                                                    <div className="col-6">{item.name}</div>
                                                    <div className="col-6">{item.message}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                <section className="mb-4">
                                    {/* Mobile Network Operators */}
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <strong>Mobile network operator:</strong>
                                        </li>
                                        {networkOperator.map((item, index) => (
                                            <li key={index} className="list-group-item">
                                                <div className="row">
                                                    <div className="col-6">{item.name}</div>
                                                    <div className="col-6">{item.message}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                <section>
                                    {/* Format */}
                                    <strong className="ps-2">Format:</strong>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>International format</th>
                                                <th>National format</th>
                                                <th>Country prefix</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {format.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.international_format}</td>
                                                    <td>{item.national_format}</td>
                                                    <td>{item.country_prefix}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                            
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </>
    )
}