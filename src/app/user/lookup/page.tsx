'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

export default function Lookup() {
    const [hlrResults, setHlrResults] = useState([
        {name: 'Query successful', message: 'error'},
        {name: 'Query successful', message: 'error'},
        {name: 'Query successful', message: 'error'},
    ]);
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
                <section>
                    <h2 className="text-center">Number Validation</h2>

                    <div className="card p-2">
                        <label htmlFor="lookup_type">Lookup Type:</label><br/>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                            <label className="form-check-label">HLR</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                            <label className="form-check-label">DNCR</label>
                        </div>
                        <form action="">
                            <label htmlFor="phone_number">Phone Number:</label><br/>
                            <input type="text" placeholder="Please Enter Your Number..." className="form-control" />
                            <button type="submit" className="btn btn-primary mt-3">Start Query</button>
                        </form>
                    </div>
                    <div className="card p-2 mt-4 mb-4">
                        <h5>Results:</h5>
                        <small className="badge bg-success" style={{ maxWidth: "120px !important" }}>Query Successfull</small>
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
                                <tr>
                                    <td>+1 123 456 7890</td>
                                    <td>(123) 456-7890</td>
                                    <td>United States</td>
                                    <td>US</td>
                                    <td>+1</td>
                                </tr>
                            </tbody>
                        </table>

                        <ul className="list-group mt-4">
                            {hlrResults.map((item, index) => (
                                <li key={index} className="list-group-item">
                                    <div className="row">
                                        <div className="col-6">{item.name}</div>
                                        <div className="col-6">{item.message}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}