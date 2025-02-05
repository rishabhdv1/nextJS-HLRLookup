'use client';

import { useState, useEffect } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countries from '@/helper/Countries';
import { timeStamp } from 'console';

const PhoneLookup = () => {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    new TomSelect('#country-select', {
      valueField: 'code',
      labelField: 'name',
      searchField: ['name', 'code'],
      options: countries.map((country) => ({
        code: country.code,
        name: `${country.name} (${country.code})`,
        flagUrl: country.flagUrl
      })),
      render: {
        option: (data:any) => `
          <div class="d-flex align-items-center">
            <img src="${data.flagUrl}" width="20" class="me-2" /> ${data.name}
          </div>`
      },
      onChange: (value:any) => setCountryCode(value)
    });
  }, []);

  const handleSearch = (e:any) => {
    e.preventDefault();
    if (!countryCode || !phoneNumber.trim()) {
      alert('Please select a country and enter a phone number');
      return;
    }

    setShowResult(true);
    setApiResponse('Fetching API response...');

    setTimeout(() => {
        const response = {
          detected_telephone_number: `${countryCode}${phoneNumber}`,
          live_status: 'LIVE',
          disposable_number: 'Register to view',
          ported_date: 'Register to view',
          current_network_details: {
            name: 'Register to view',
            mccmnc: 'Register to view',
            country_name: 'INdia',
            country_iso3: 'INdia',
            area: 'Delhi',
            country_prefix: countryCode
          },
          original_network: 'AVAILABLE',
          original_network_details: {
            name: 'Reliance Jio',
            mccmnc: '404',
            country_name: 'INDIA',
            country_iso3: 'IND',
            area: 'india',
            country_prefix: countryCode
          },
          timeStamp: '2025-02-05T06:01:23Z',
          telephone_number_type: 'MOBILE'
        };
      setApiResponse(JSON.stringify(response, null, 2));
    }, 2000);
  };

  return (
    <div style={{ height: '100vh' }}>
        <header style={{ height: '10vh' }}>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img className="img-fluid w-25" src="https://oceanpbx.club/assets/img/logo.png" alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                    <form className="d-flex ms-auto">
                        <button className="btn btn-outline-primary me-2">Sign Up</button>
                        <button className="btn btn-primary">Login</button>
                    </form>
                    </div>
                </div>
            </nav>
        </header>
        <main className="bg-custom" style={{ minHeight: '90vh' }}>
            <div className="container">
                <div className="text-center pt-5 pb-5">
                  <h1 className="fw-bold">Global Phone Number Verification</h1>
                  <p className="lead">Verify if a phone number is active and reachable using worldwide HLR lookup</p>
                  <p>Enter a phone number along with the country code below:</p>

                  <div className="card shadow p-4 mx-auto" >
                    <div className="input-group">
                        <select id="lookupType" className="input-group-text">
                            <option value="hlr">HLR</option>
                            <option value="dncr">DNCR</option>
                        </select>
                        <select id="country-select" className="input-group-text w-25">
                            <option value="">Select Country</option>
                        </select>
                        <input type="tel" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{  }} />
                        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                    </div>
                  {/* <div className="row g-2">
                      <div className="col-md-3">
                          <select id="lookupType" className="form-select">
                              <option value="hlr">HLR</option>
                              <option value="dncr">DNCR</option>
                          </select>
                      </div>
                      <div className="col-md-4">
                          <select id="country-select" className="form-select">
                              <option value="">Select Country</option>
                          </select>
                      </div>
                      <div className="col-md-5">
                          <input type="tel" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                      </div>
                  </div> */}
                  {/* <button className="btn btn-primary w-100 mt-3" onClick={handleSearch}>Search</button> */}
                  </div>

                  {showResult && (
                  <div className="card shadow p-4 mx-auto mt-4 text-start">
                      <h5 className="fw-bold">API Result:</h5>
                      <pre className="bg-dark text-success p-3 rounded">
                      <code>{apiResponse}</code>
                      </pre>
                  </div>
                  )}
                </div>
            </div>
        </main>
    </div>
  );
};

export default PhoneLookup;
