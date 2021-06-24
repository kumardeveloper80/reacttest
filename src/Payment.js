// import React from 'react';
// import './Payment.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import { connect } from 'react-redux';
// import { makePayment } from '../redux/PaymentAction';

// const initialValues = {
//     cardNo: '',
//     name: '',
//     date: '',
//     code: '',
//     amount: 0
// };

// const onSubmit = values => {
//     axios.post('https://jsonplaceholder.typicode.com/posts', values)
//         .then(response => {
//             alert("Payment Successful")
//         })
//         .catch(error => {
//             alert("Payment Failed")
//         })
// };

// const validate = values => {
//     let errors = {};

//     if (!values.cardNo) {
//         errors.cardNo = 'Required';
//     } else if (values.cardNo.length !== 16) {
//         errors.cardNo = 'Card number should be atleast 16 digits';
//     }

//     if (!values.name) {
//         errors.name = 'Required';
//     }

//     if (!values.date) {
//         errors.date = 'Required';
//     }

//     if (!values.code) {
//         errors.code = 'Required';
//     } else if (values.code.length !== 3) {
//         errors.code = 'CVV should be atleast 3 digits';
//     }

//     if (!values.amount) {
//         errors.amount = 'Required';
//     } else if (values.amount < 1) {
//         errors.amount = 'Amount cannot be less than 1';
//     }

//     return errors;
// }


// function Payment(props) {

//     const formik = useFormik({
//         initialValues,
//         onSubmit,
//         validate
//     });
//     let amountt = localStorage.getItem('Amount');
//     formik.values.amount = amountt;
//     //importing system date
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1; //as january = 0
//     var yyyy = today.getFullYear();
//     if (dd < 10) { dd = '0' + dd; }
//     if (mm < 10) { mm = '0' + mm; }
//     var day = yyyy + '-' + mm + '-' + dd;



//     return (
//         <>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <div className="row">
//                             <div className="col-md-12">
//                                 <div className="row">
//                                     <div className="Payment d-flex align-items-center">
//                                         <div className="col-md-7 mx-auto">
//                                             <div className="Payment__form">
//                                                 <form onSubmit={formik.handleSubmit}>

//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-2 text-right">
//                                                             <label htmlFor='cardNo'>Credit card number</label>
//                                                         </div>
//                                                         <div className="col-md-6 mb-2 text-left">
//                                                             <input
//                                                                 type='text'
//                                                                 id='cardNo'
//                                                                 name='cardNo'
//                                                                 maxLength='16'
//                                                                 onChange={formik.handleChange}
//                                                                 onBlur={formik.handleBlur}
//                                                                 value={formik.values.cardNo}
//                                                             /><br />
//                                                             {formik.touched.cardNo && formik.errors.cardNo ? <div id='error'>{formik.errors.cardNo}</div> : null}
//                                                         </div>
//                                                     </div>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-2 text-right">
//                                                             <label htmlFor='name'>Card holder name</label>
//                                                         </div>
//                                                         <div className="col-md-6 mb-2 text-left">
//                                                             <input
//                                                                 type='text'
//                                                                 id='name'
//                                                                 name='name'
//                                                                 onChange={formik.handleChange}
//                                                                 onBlur={formik.handleBlur}
//                                                                 value={formik.values.name}
//                                                             /><br />
//                                                             {formik.touched.name && formik.errors.name ? <div id='error'>{formik.errors.name}</div> : null}
//                                                         </div>
//                                                     </div>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-2 text-right">
//                                                             <label htmlFor='date'>Expiration date</label>
//                                                         </div>
//                                                         <div className="col-md-6 mb-2 text-left">
//                                                             <input
//                                                                 type='date'
//                                                                 id='date'
//                                                                 name='date'
//                                                                 onChange={formik.handleChange}
//                                                                 onBlur={formik.handleBlur}
//                                                                 min={day}
//                                                                 value={formik.values.date}
//                                                             /><br />
//                                                             {formik.touched.date && formik.errors.date ? <div id='error'>{formik.errors.date}</div> : null}
//                                                         </div>
//                                                     </div>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-2 text-right">
//                                                             <label htmlFor='code'>Security code - CVV</label>
//                                                         </div>
//                                                         <div className="col-md-6 mb-2 text-left">
//                                                             <input
//                                                                 type='text'
//                                                                 id='code'
//                                                                 name='code'
//                                                                 maxLength='3'
//                                                                 onChange={formik.handleChange}
//                                                                 onBlur={formik.handleBlur}
//                                                                 value={formik.values.code}
//                                                             /><br />
//                                                             {formik.touched.code && formik.errors.code ? <div id='error'>{formik.errors.code}</div> : null}
//                                                         </div>
//                                                     </div>
//                                                     <div className="row">
//                                                         <div className="col-md-6 mb-2 text-right">
//                                                             <label htmlFor='amount'>Amount</label>
//                                                         </div>
//                                                         <div className="col-md-6 mb-2 text-left">
//                                                             <input
//                                                                 className='Payment__form--amt'
//                                                                 type='number'
//                                                                 id='amount'
//                                                                 name='amount'
//                                                                 onChange={formik.handleChange}
//                                                                 onBlur={formik.handleBlur}
//                                                                 value={formik.values.amount}
//                                                             /><br />
//                                                             {formik.touched.amount && formik.errors.amount ? <div id='error'>{formik.errors.amount}</div> : null}
//                                                         </div>
//                                                     </div>
//                                                     <div className="row">
//                                                         <div className="col-md-12 mb-2 text-center">
//                                                             <button
//                                                                 className='Payment__btn--two'
//                                                                 type='submit'
//                                                                 onClick={() => props.makePayment(formik.values.cardNo, formik.values.name, formik.values.date, formik.values.code, formik.values.amount)}
//                                                             >Submit</button>
//                                                         </div>
//                                                     </div>

//                                                 </form>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// const mapStateToProps = state => {
//     return {
//         cardNo: state.cardNo,
//         name: state.name,
//         date: state.date,
//         code: state.code,
//         amount: state.amount
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         makePayment: (cardNo, name, date, code, amount) => dispatch(makePayment(cardNo, name, date, code, amount))
//     }
// }
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Payment);