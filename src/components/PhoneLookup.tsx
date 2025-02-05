'use client';

import { useState, useEffect } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countries from '@/helper/Countries';
import { timeStamp } from 'console';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faDesktop, faGlobe, faPhone, faShield, faStopwatch, faTicket, faTty } from '@fortawesome/free-solid-svg-icons';
const iconMap: Record<string, any> = {
  phone: faPhone,
  desktop: faDesktop,
  globe: faGlobe,
  shield: faShield,
  ticket: faTicket,
  book: faBook,
  checkCircle: faCheckCircle,
  stopWatch: faStopwatch,
  tty: faTty,
};
const verification = [
  { icon: 'phone', title: 'Fast Data Cleaning for Telephone Numbers', subtitle: 'Upload all your data in one go, in its current format. We\'ll insert your results alongside your original data, in the same order.'},
  { icon: 'desktop', title: 'Simple API Integration', subtitle: 'Easy to use, easy to understand. Send up to 80 requests in one secure API request and we\'ll return the results quickly, in a clear format so you can integrate seamlessly.'},
  { icon: 'globe', title: 'USA, Europe, Africa, Asia, Americas, Oceana coverage', subtitle: 'Extensive worldwide coverage for over 1200 mobile telephone network carriers.'},
  { icon: 'shield', title: 'Reduce fraud with ported date details', subtitle: 'For 51 different countries we provide the last ported date for any ported mobile telephone number.'},
  { icon: 'ticket', title: 'Fast automated top-up', subtitle: 'Quickly get back to business using our fully automated topup system.'},
  { icon: 'book', title: 'Test and Analyse for free', subtitle: 'Sign up is free. Support is Free. Testing is free. We know you don’t know how valuable we are to your business without giving us a try first so all new accounts get free credits.'},
  { icon: 'checkCircle', title: 'Eliminate Deduplication', subtitle: 'We can store your results for up to 30 days and provide your cached result at no charge. There’s no need to spend time checking your data against previous results.'},
  { icon: 'stopWatch', title: 'Schedule batches', subtitle: 'We can store your results for up to 30 days and provide your cached result at no charge. There’s no need to spend time checking your data against previous results.'},
  { icon: 'tty', title: 'Landline Validation', subtitle: 'HLR Lookup is compatible with the UK and Ireland landline networks, to detect if a landline telephone number is active. Not available outside the UK or Ireland.'},
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
        <main>
          <section className="bg-custom" style={{ minHeight: '60vh' }}>
            <div className="container">
              <div className="text-center pt-5 pb-5">
                <h1 className="fw-bold">HLR/DNCR Lookup</h1>
                <p className="lead">Perform a HLR and DNCR lookup to check validity and availability of a mobile or landline number worldwide.</p>

                <div className="card shadow p-4 mx-auto" >
                  <div className="input-group">
                      <select id="lookupType" className="input-group-text">
                          <option value="hlr">HLR</option>
                          <option value="dncr">DNCR</option>
                      </select>
                      <select id="country-select" className="input-group-text w-25">
                          <option value="">Select Country</option>
                      </select>
                      <input type="number" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ boxShadow: 'none', border: '1px solid #ccc' }} />
                      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                  </div>
                </div>

                {showResult && (
                  <div className="">
                    <div className="card shadow p-4 mx-auto mt-4 text-start">
                        <h5 className="fw-bold">API Result:</h5>
                        <pre className="bg-dark text-success p-3 rounded">
                        <code>{apiResponse}</code>
                        </pre>
                    </div>
                    <div className="card mt-4">
                      <h1 className="fw-bold text-center">Result</h1>
                      <ul className="list-group list-group-flush custom-list-group">
                        <li className="list-group-item">
                            <span><strong>status</strong></span>
                            <span>1</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>status_message</strong></span>
                            <span>Success</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>lookup_outcome</strong></span>
                            <span>1</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>lookup_outcome_message</strong></span>
                            <span>Success</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>international_format_number</strong></span>
                            <span>919274884923</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>international_formatted</strong></span>
                            <span>+91 9274884923</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>national_format_number</strong></span>
                            <span>09274884923</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>country_code</strong></span>
                            <span>IN</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>country_name</strong></span>
                            <span>India</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>country_prefix</strong></span>
                            <span>91</span>
                        </li>
                        <li className="list-group-item">
                            <ul className='nav flex-column'>
                              <li className="nav-item"><strong>network_code:</strong></li>
                              <li className="nav-item"><strong>name:</strong></li>
                              <li className="nav-item"><strong>country:</strong></li>
                              <li className="nav-item"><strong>network_type:</strong></li>
                              <li className="nav-item"><strong>network_code:</strong></li>
                              <li className="nav-item"><strong>name:</strong></li>
                              <li className="nav-item"><strong>country:</strong></li>
                              <li className="nav-item"><strong>network_type:</strong></li>
                            </ul>
                            <ul className='nav flex-column'>
                              <li className="nav-item">405863</li>
                              <li className="nav-item">Reliance Jio Infocomm Ltd (RJIL)</li>
                              <li className="nav-item">IN</li>
                              <li className="nav-item">mobile</li>
                              <li className="nav-item">405863</li>
                              <li className="nav-item">Reliance Jio Infocomm Ltd (RJIL)</li>
                              <li className="nav-item">IN</li>
                              <li className="nav-item">mobile</li>
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <ul className='nav flex-column'>
                            <li className="nav-item"><strong>network_code:</strong></li>
                              <li className="nav-item"><strong>name:</strong></li>
                              <li className="nav-item"><strong>country:</strong></li>
                              <li className="nav-item"><strong>network_type:</strong></li>
                              <li className="nav-item"><strong>network_code:</strong></li>
                              <li className="nav-item"><strong>name:</strong></li>
                              <li className="nav-item"><strong>country:</strong></li>
                              <li className="nav-item"><strong>network_type:</strong></li>
                            </ul>
                            <ul className='nav flex-column'>
                              <li className="nav-item">405863</li>
                              <li className="nav-item">Reliance Jio Infocomm Ltd (RJIL)</li>
                              <li className="nav-item">IN</li>
                              <li className="nav-item">mobile</li>
                              <li className="nav-item">405863</li>
                              <li className="nav-item">Reliance Jio Infocomm Ltd (RJIL)</li>
                              <li className="nav-item">IN</li>
                              <li className="nav-item">mobile</li>
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <span><strong>valid_number</strong></span>
                            <span>Valid</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>reachable</strong></span>
                            <span>Reachable</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>ported</strong></span>
                            <span>Assumed Not Ported</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>roaming</strong></span>
                            <span>Not Roaming</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>gsm_code</strong></span>
                            <span>0</span>
                        </li>
                        <li className="list-group-item">
                            <span><strong>gsm_message</strong></span>
                            <span>No Error</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className="container">
            <section  className="mt-5">
              <h1 className="m-4 text-center" >How HLR/DNCR Work ?</h1>
              <iframe src="https://www.hlr-lookups.com/videos/hlr-lookups.webm" style={{ width: '100%', height: '100vh', border: 'none' }}></iframe>
            </section>
            <section className="text-center">
              <h1 className="m-4">Easy phone number verification</h1>
              <div className="row">
                {verification.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card p-4" style={{ minHeight: '250px' }}>
                      <FontAwesomeIcon style={{ fontSize: '2em' }} className="mb-4" icon={iconMap[item.icon]} />
                      <h3 className="feature-title">{item.title}</h3>
                      <span className="feature-desc">
                        <span>{item.subtitle}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
        <footer className="bg-light p-4 text-center">
          <span>HLR/DNCR Lookup</span>
        </footer>
    </div>
  );
};

export default PhoneLookup;
