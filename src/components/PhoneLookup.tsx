'use client';

import "bootstrap/dist/js/bootstrap.bundle.min";

import { useState, useEffect } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import countries from '@/helper/Countries';
import { log, timeStamp } from 'console';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faCheckCircle, faChevronCircleLeft, faChevronCircleRight, faDesktop, faGlobe, faPhone, faShield, faStopwatch, faTicket, faTty } from '@fortawesome/free-solid-svg-icons';
import Partners from "./Partners";
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
  //1 Hook Variabe area
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [lookupType, setLookupType] = useState("hlr");
  const [pricingData, setPricingData] = useState([]);

  //2. Function defination area
  const handleLookupTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLookupType(e.target.value);
  };

  useEffect(() => {
    const fetchPricingData = async () => {
      try {
        const response = await fetch('/api/getpricing');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data >>", data.res);
        

        setPricingData(data.res);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
      }
    };
    fetchPricingData();
  }, []);

  useEffect(() => { // PageReload

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

  const handleSearch = async  (e:any) => {
    e.preventDefault();
    if (!countryCode || !phoneNumber.trim() || !lookupType) {
      alert('Please select a country and enter a phone number');
      return;
    }
    const formattedCountryCode = countryCode.replace('+', '');
    const foramteNumber = formattedCountryCode + phoneNumber;
    setShowResult(true);
    setApiResponse('Fetching API response...');  
    console.log("foramteNumber",foramteNumber);
    try {
      const apiResponse = await handleAPICall(foramteNumber,lookupType);
      setApiResponse(JSON.stringify(apiResponse, null, 2));
    } catch (error) {
      setApiResponse(`${error}`);
    }

  };
  const handleAPICall = async (formattedNumber: any,lookupType:any) => {
    const ipaddadd = await getPublicIp();
    const apiUrl = `/api/lookup?type=${lookupType}&number=${formattedNumber}&ipadd=${ipaddadd}`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };
  const getPublicIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip; // Return the public IP
    } catch (error) {
      console.error("Error fetching public IP:", error);
      return null;
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing-section");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };


  //3. Retrurn statement
  return (
    <div style={{ height: '100vh' }}>
        <header className="bg-white">
            <nav className="navbar">
              <div className="container">
                <a href="https://oceanpbx.club/" target="_blank" className="navbar-brand">
                  <img className="img-fluid custom-logo" src="https://oceanpbx.club/assets/img/logo.png" alt="" />
                </a>
                <form className="d-flex">
                  <button type="button" className="btn btn-outline-primary me-2" onClick={scrollToPricing}>Pricing</button>
                  <a href="https://oceanpbx.club/store/dnrc-check" target="_blank" className="btn btn-primary">Buy Now</a>
                </form>
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
                  <form onSubmit={handleSearch} >
                    {/* <div className="input-group">
                        <select  onChange={handleLookupTypeChange} id="lookupType" className="input-group-text">
                            <option value="hlr">HLR</option>
                            <option value="dncr">DNCR</option>
                        </select>
                        <select id="country-select" className="input-group-text w-25">
                            <option value="">Select Country</option>
                        </select>
                        <input type="text" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ boxShadow: 'none', border: '1px solid #ccc' }} />
                        <button className="btn btn-primary" type="submit">Search</button>
                    </div> */}
                    <div className="row align-items-center">
                      <div className="col-sm-12 col-lg-2 mb-2">
                        <select onChange={handleLookupTypeChange} id="lookupType" className="form-control">
                            <option value="hlr">HLR</option>
                            <option value="dncr">DNCR</option>
                        </select>
                      </div>
                      <div className="col-sm-12 col-lg-4 mb-2">
                        <select id="country-select" className="form-control">
                            <option value="">Select Country</option>
                        </select>
                      </div>
                      <div className="col-sm-12 col-lg-5 mb-2">
                        <input type="text" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} style={{ boxShadow: 'none', border: '1px solid #ccc' }} />
                      </div>
                      <div className="col-sm-12 col-lg-1 mb-2">
                        <button className="btn btn-primary w-100" type="submit">Search</button>
                      </div>
                    </div>
                  </form>
                </div>

                {showResult && (
                  <div className="">
                    <div className="card shadow p-4 mx-auto mt-4 text-start">
                        <h5 className="fw-bold">API Result:</h5>
                        <pre className="bg-dark text-success p-3 rounded">
                        <code>{apiResponse}</code>
                        </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className="container">
            <section className="mt-5 m-0">
              <h1 className="m-4 text-center">How HLR/DNCR Work?</h1>
              <div className="video-container">
                <iframe src="https://www.hlr-lookups.com/videos/hlr-lookups.webm" allowFullScreen ></iframe>
              </div>
            </section>
            <section className="text-center mb-4">
              <h1 className="m-4">Easy phone number verification</h1>
              <div className="row">
                {verification.map((item, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card p-4" style={{ minHeight: '250px' }}>
                      <FontAwesomeIcon style={{ fontSize: '2em', color: '#2563EB' }} className="mb-4" icon={iconMap[item.icon]} />
                      <h3 className="feature-title">{item.title}</h3>
                      <span className="feature-desc">
                        <span>{item.subtitle}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section id="pricing-section">
              <h1 className="m-4 text-center" >Our Pricing</h1>
              <div className="table-responsive">
                <table className="table table-striped fa-check text-successtable-border border-light">
                  <thead className="border-light">
                    <tr>
                      <th scope="col">Lower Bound</th>
                      <th scope="col"><strong>Upper Bound</strong></th>
                      <th scope="col"><strong>HLR Lookups</strong></th>
                      <th scope="col"><strong>DNCR Lookups</strong></th>
                    </tr>
                  </thead>
                  <tbody>
                    { pricingData && pricingData.map((row:any, index:any) => (
                      <tr key={index}>
                        <th scope="row">{row.lowerBound}</th>
                        <td>{row.upperBound}</td>
                        <td>{row.hlrLookup}</td>
                        <td>{row.dncrLookup}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <section className="text-center">
              <Partners />
              {/* <h3>Our Globle Network Partner</h3>
              
              <h3>Our Clients</h3> */}
            </section>
          </div>
        </main>
        <footer>
          <nav className="navbar navbar-expand-lg border-top">
            <div className="container">
              <div className="row ">
                <div className="col-md-8">
                  <a className="navbar-brand" href="https://oceanpbx.club/">
                    <img className="img-fluid w-25" src="https://oceanpbx.club/assets/img/logo.png" alt="" />
                  </a>
                </div>
                <div className="col-md-4 text-end">
                  <span className="d-block mt-2 ">Copyright © 2025 OceanPBX. All Rights Reserved.</span>
                </div>
              </div>
            </div>
          </nav>
        </footer>
    </div>
  );
};

export default PhoneLookup;
