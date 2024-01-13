import React, { useState } from "react";
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerUser } from "../../store/Auth/Action";
import "./SignUp.css";
import logo from './images/twitter-logo.png';

function SignUp() {
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('01');
    const [selectedDay, setSelectedDay] = useState('Day');
    const [selectedYear, setSelectedYear] = useState('');

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required("Kullanıcı adı zorunludur"),
        password: Yup.string().required("Şifre zorunludur"),
        birthDate: Yup.string().required("Doğum tarihi zorunludur"),
        selectedYear: Yup.string()
            .matches(/^(19[0-9][0-9]|20[0-2][0-3])$/, "Lütfen 1900 ile 2023 arasında geçerli bir yıl seçin")
    });

    const [formErrors, setFormErrors] = useState({});
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                fullName,
                password,
                email,
                birthDate: `${selectedYear}-${selectedMonth}-${selectedDay}`,
            };

            console.log(formData);

            validationSchema.validate(formData, { abortEarly: false })
                .then(() => {
                    dispatch(registerUser(formData));
                })
                .catch((validationErrors) => {
                    const errors = {};
                    validationErrors.inner.forEach(error => {
                        errors[error.path] = error.message;
                    });
                    setFormErrors(errors);
                });
        } catch (error) {
            console.error('Kayıt Başarısız', error);
        }
    };

    const yearOptions = [];
    for (let year = 1903; year <= 2023; year++) {
        yearOptions.push(
            <option key={year} value={year}>
                {year}
            </option>
        );
    }

    return (
        <div className="signup-main-container">
            <div className="signup-container">
                <img src={logo} alt="logo" style={{ width: 40, height: 33 }} />
                <h1 className="signup-header">Create an account</h1>
                <form className="signup-form" onSubmit={handleFormSubmit}>
                    <label>
                        <input className="signup-form-text" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" name="name" placeholder="Name" />
                    </label>
                    <label>
                        <input className="signup-form-password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Password" />
                    </label>
                    <label>
                        <input className="signup-form-phonenumber" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="mobile" placeholder="Email" />
                    </label>
                    <div className="signup-date-container">
                        <div className="month-container">
                            <label>
                                <select name="month" className="signup-form-month-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                                    <option value="01">January</option>
                                    <option value="02">February</option>
                                    <option value="03">March</option>
                                    <option value="04">April</option>
                                    <option value="05">May</option>
                                    <option value="06">June</option>
                                    <option value="07">July</option>
                                    <option value="08">August</option>
                                    <option value="09">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </label>
                        </div>
                        <div className="day-container">
                            <label>
                                <select name="day" className="signup-form-day-select" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                                    <option value="Day">Day</option>
                                    {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
                                        <option key={day} value={day}>{day}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="year-container">
                            <label>
                                <select id="year-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                                    <option value="">Year</option>
                                    {yearOptions}
                                </select>
                            </label>
                        </div>
                    </div>
                    <button className="signup-form-button" type="submit">Sign Up</button>
                </form>
                {Object.keys(formErrors).map((key, index) => (
                    <p key={index} className="error-message">{formErrors[key]}</p>
                ))}
            </div>
        </div>
    );
}

export default SignUp;
