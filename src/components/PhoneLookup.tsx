'use client';

import { useState, useEffect } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const countries = [
  { code: '+1', name: 'USA', flagUrl: 'https://flagcdn.com/w40/us.png' },
  { code: '+1', name: 'Canada', flagUrl: 'https://flagcdn.com/w40/ca.png' },
  { code: '+44', name: 'UK', flagUrl: 'https://flagcdn.com/w40/gb.png' },
  { code: '+61', name: 'Australia', flagUrl: 'https://flagcdn.com/w40/au.png' },
  { code: '+91', name: 'India', flagUrl: 'https://flagcdn.com/w40/in.png' },
  { code: '+65', name: 'Singapore', flagUrl: 'https://flagcdn.com/w40/sg.png' },
  { code: '+60', name: 'Malaysia', flagUrl: 'https://flagcdn.com/w40/my.png' },
  { code: '+64', name: 'New Zealand', flagUrl: 'https://flagcdn.com/w40/nz.png' },
  { code: '+66', name: 'Thailand', flagUrl: 'https://flagcdn.com/w40/th.png' },
  { code: '+62', name: 'Indonesia', flagUrl: 'https://flagcdn.com/w40/id.png' },
  { code: '+63', name: 'Philippines', flagUrl: 'https://flagcdn.com/w40/ph.png' },
  { code: '+84', name: 'Vietnam', flagUrl: 'https://flagcdn.com/w40/vn.png' },
  { code: '+81', name: 'Japan', flagUrl: 'https://flagcdn.com/w40/jp.png' },
  { code: '+82', name: 'South Korea', flagUrl: 'https://flagcdn.com/w40/kr.png' }
];

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
            original_network: 'NOT_AVAILABLE',
            live_status: '<a href="https://www.google.com/" class="text-blue-400 underline">Register to view</a>',
            disposable_number: '<a href="https://www.google.com/" class="text-blue-400 underline">Register to view</a>',
            ported_date: '<a href="https://www.google.com/" class="text-blue-400 underline">Register to view</a>',
            current_network_details: {
              name: '<a href="https://www.google.com/" class="text-blue-400 underline">Register to view</a>',
              country_name: 'countryName',
              area: 'areaName',
              country_prefix: countryCode
            }
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
                        <button className="btn btn-primary">Login</button>
                    </form>
                    </div>
                </div>
            </nav>
        </header>
        <main className="bg-custom" style={{ minHeight: '90vh' }}>
            <div className="container">
                <div className="text-center pt-5 pb-5">
                    <h1 className="fw-bold">Globle Phone Validation Made Simple</h1>
                    <p className="lead">Check if a telephone number is contactable by querying the worldwide HLR</p>
                    <p>Enter a telephone number with the country code prefix below:</p>

                    <div className="card shadow p-4 mx-auto" >
                        <div className="input-group">
                            <select id="lookupType" className="input-group-text">
                                <option value="hlr">HLR</option>
                                <option value="dncr">DNCR</option>
                            </select>
                            <select id="country-select" className="input-group-text w-25">
                                <option value="">Select Country</option>
                            </select>
                            <input type="tel" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
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
