import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PrimeReact from 'primereact/api';
import { ToggleButton } from 'primereact/togglebutton';
import "react-credit-cards/es/styles-compiled.css";
import NumberFormat from 'react-number-format';

const App = () => {
  const [durationList, setDurationList] = useState([]);
  const [ratePerGb, setRatePerGb] = useState(3);
  const [selectGBLimit, setSelectGBLimit] = useState(5);
  const [finalPrice, setFinalPrice] = useState();
  const [firstdiv, setFirstdiv] = useState(true);
  const [secoenddiv, setSecoenddiv] = useState(false);
  const [thirddiv, setThirddiv] = useState(false);
  const [upfront, setUpfront] = useState(false);
  const [cardnuber, setCardnuber] = useState('####');
  const [expdate, setExpdate] = useState('0000');
  const [cvvcode, setCvvcode] = useState(0);
  const [eemail, setEmail] = useState();
  const [tc, setTc] = useState(true);
  const [scone, scOne ] = useState(true);
  const [sctwo, scTwo ] = useState(true);
  const [scthree, scThree ] = useState(true);

  PrimeReact.ripple = true;

  useEffect(() => {
    loadDuration();
    total();
  }, [ratePerGb, selectGBLimit, upfront]);

  const total = () => {
    var first = ratePerGb * selectGBLimit;
    var secoend = first * 10;
    var third = secoend / 100;
    {
      !upfront ? setFinalPrice(ratePerGb * selectGBLimit) : setFinalPrice((ratePerGb * selectGBLimit) - third);
    }
  }

  const user = { 
    a1_ratePerGb: ratePerGb,
    a2_selectGBLimit: selectGBLimit,
    a3_upfront: upfront,
    a4_finalPrice: finalPrice,
    a5_cardnuber: cardnuber,
    a6_expdate: expdate,
    a7_cvvcode: cvvcode,
    a8_eemail: eemail,
    a9_tc: tc
  };

  const onSubmit = (e) => {
    let isValidEmail = checkEmail();
    let isTc = checkTc();
    {
      isValidEmail && isTc
        ? onSubmitFinal(e) : goToThirdCheck();
    }
    e.preventDefault();
    console.log(user);
  }

  const onSubmitFinal = async e => {
    scThree(false);
    e.preventDefault()
    await axios.post("https://httpbin.org/post", user);
  }

  function goToFirst() {
    setFirstdiv(true);
    setSecoenddiv(false);
    setThirddiv(false);
    scOne(true);
  }
  function goToSecoend() {
    setFirstdiv(false);
    setSecoenddiv(true);
    setThirddiv(false);
    scOne(false);
    scTwo(true);
  }
  function goToThirdCheck() {
    setFirstdiv(false);
    setSecoenddiv(false);
    setThirddiv(true);
    scOne(false);
    scTwo(false);
  }
  function goToThird() {
    let isValidCard = checkCardDetails();
    let isValidExp = checkExpDetails();
    let isValidCvv = checkCvvDetails();
    {
      isValidCard && isValidExp && isValidCvv
        ?
        goToThirdCheck() : goToSecoend();
    }
  }

  const checkEmail = () => {
    if (eemail.length !== 0) {
      return true;
    }
    else {
      alert("Please Enter Email");
      return false;
    }
  }

  const checkTc = () => {
    if (tc === true) {
      return true;
    }
    else {
      alert("Please Select Yes For Tearms & Condition");
      return false;
    }
  }

  const checkCardDetails = () => {
    if (cardnuber.length === 19) {
      return true;
    }
    else {
      alert("CardNumber Invalid");
      return false;
    }
  }

  const checkCvvDetails = () => {
    if (cvvcode.length === 3) {
      return true;
    }
    else {
      alert("Cvv Invalid");
      return false;
    }
  }

  const checkExpDetails = () => {
    let month = expdate.substring(0, 2);
    let year = expdate.substring(2, 4);
    let today = new Date();
    let cYear = today.getFullYear().toString().substr(-2);
    let cMonth = ('0' + (today.getMonth() + 1)).slice(-2);

    console.log(month +"-"+ year +"-"+ cYear +"-"+ cMonth);
    if (year < cYear) {
      alert("Year Should not older then current");
      return false;
    }
    else {
      if(year == cYear && month < cMonth)
      {
        alert("Month Should not older then current");
        return false;
      }
      else {
        return true;
      }           
    }

  }

  const loadDuration = async () => {
    const result = await axios.get("https://cloud-storage-prices-moberries.herokuapp.com/prices");
    setDurationList(result.data.subscription_plans);
  }

  function handleCardNumberChange(e) {
    const newName = e.target.value.replace(
      /[^0-9\s]/g,
      "");
    setCardnuber(newName);
  }

  function handleExpdateChange(e) {
    const newName = e.target.value.replace(
      /[^0-9\s]/g,
      "");
    setExpdate(newName);
  }

  function handleCvvcodeChange(e) {
    const newName = e.target.value.replace(
      /[^0-9\s]/g,
      "");
    setCvvcode(newName);
  }

  function limitMonth(val, max) {
    if (val.length === 1 && val[0] > max[0]) {
      val = '0' + val;
    }
    if (val.length === 2) {
      if (Number(val) === 0) {
        val = '01';
      } else if (val > max) {
        val = max;
      }
    }
    return val;
  }

  function cardExpiry(val) {
    let month = limitMonth(val.substring(0, 2), '12');
    let year = val.substring(2, 4);
    return month + (year.length ? '/' + year : '');
  }

  return (
    <>
      <div className="App">
        <form className="netcardform" onSubmit={(e) => onSubmit(e)}>
          <div className="container">
            <div className="row">
              <div className="col-md-6 mx-auto py-3">
                <div className="row">
                  <div className="col-4 text-left">
                    <button type="button" onClick={goToFirst}  className={scone ? "btn btn-secondary" : "btn btn-success"} >1</button>
                  </div>
                  <div className="col-4 text-center">
                    <button type="button" onClick={goToSecoend} className={sctwo ? "btn btn-secondary" : "btn btn-success"}>2</button>
                  </div>
                  <div className="col-4 text-right">
                    <button type="button" onClick={goToThird} className={scthree ? "btn btn-secondary" : "btn btn-success"}>3</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {firstdiv ?
                  <div className="first_step">
                    <div className="container text-left">
                      <div className="row">
                        <div className="col-md-6 mx-auto py-3 bg-secondary text-white border border-secondary">
                          <div className="row">
                            <div className="col-6">
                              Duration
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <select
                                  value={ratePerGb}
                                  name="ratePerGb"
                                  autoComplete="off"
                                  className="form-select form-select-lg"
                                  onChange={(e) => setRatePerGb(e.target.value)}
                                >
                                  {
                                    durationList.map((data) => (
                                      <option value={data.price_usd_per_gb}>{data.duration_months}</option>
                                    ))
                                  }
                                </select>
                              </div>
                            </div>
                            <div className="col-6">
                              Amount of gigabytes in a cloud
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <select
                                  value={selectGBLimit}
                                  name="selectGBLimit"
                                  autoComplete="off"
                                  className="form-select form-select-lg"
                                  onChange={(e) => setSelectGBLimit(e.target.value)}
                                >
                                  <option value="5">5GB</option>
                                  <option value="10">10GB</option>
                                  <option value="50">50GB</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-6">
                              Upfront payment
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <ToggleButton checked={upfront} onChange={(e) => setUpfront(e.value)} onIcon="pi pi-check" offIcon="pi pi-times" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-12">
                                    <label>Rate Per Gb By Duration of Plan : <strong>{ratePerGb}</strong></label>
                                  </div>
                                  <div className="col-12">
                                    <label>Cloud Limit : <strong>{selectGBLimit}</strong></label>
                                  </div>
                                  <div className="col-12">
                                    <label>Total Price Is : <strong>{finalPrice}</strong></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <button type="button" onClick={goToSecoend} className="btn btn-info mr-3">Next</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""}
                {secoenddiv ?
                  <div className="Secoend_step">
                    <div className="container text-left">
                      <div className="row">
                        <div className="col-md-6 mx-auto py-3 bg-secondary text-white border border-secondary">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <NumberFormat value={cardnuber} onChange={(e) => handleCardNumberChange(e)} placeholder="#### #### #### ####" format="#### #### #### ####" mask="_" />

                              </div>
                            </div>
                            <div className="col-8">
                              <div className="form-group">
                                <NumberFormat value={expdate} onChange={(e) => handleExpdateChange(e)} format={cardExpiry} placeholder="MM/YY" />

                              </div>
                            </div>
                            <div className="col-4">
                              <div className="form-group">
                                <NumberFormat value={cvvcode} type="password" onChange={(e) => handleCvvcodeChange(e)} format="###" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-12">
                                    <label>Rate Per Gb By Duration of Plan : <strong>{ratePerGb}</strong></label>
                                  </div>
                                  <div className="col-12">
                                    <label>Cloud Limit : <strong>{selectGBLimit}</strong></label>
                                  </div>
                                  <div className="col-12">
                                    <label>Total Price Is : <strong>{finalPrice}</strong></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <button type="button" onClick={goToFirst} className="btn btn-info mr-3">Back</button>
                              <button type="button" onClick={goToThird} className="btn btn-info mr-3">Next</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""}
                {thirddiv ?
                  <div className="third_step">
                    <div className="container text-left">
                      <div className="row">
                        <div className="col-md-6 mx-auto py-3 bg-secondary text-white border border-secondary">
                          <div className="row">
                            <div className="col-12">
                              <div className="form-group">
                                <div className="row">
                                  <div className="col-6">
                                    <label>Rate Per Gb By Duration of Plan : <strong>{ratePerGb}</strong></label>
                                  </div>
                                  <div className="col-6">
                                    <label>Cloud Limit : <strong>{selectGBLimit}</strong></label>
                                  </div>
                                  <div className="col-12">
                                    <label>Total Price Is : <strong>{finalPrice}</strong></label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              Email of the user
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <input
                                  type="email"
                                  placeholder="Enter Email"
                                  value={eemail}
                                  name="email"
                                  autoComplete="off"
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              Terms and conditions
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                              <ToggleButton checked={tc} onChange={(e) => setTc(e.value)} onIcon="pi pi-check" offIcon="pi pi-times" />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="form-group">
                                <label>Total Price is : <strong>{finalPrice}</strong></label>
                              </div>
                            </div>
                            <div className="col-6">
                              <button type="button" onClick={goToSecoend} className="btn btn-info mr-3">Back</button>
                              <button type="submit" className="btn btn-info mr-3">Confirm</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  : ""}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;