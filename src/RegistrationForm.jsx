import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiError } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import style from './App.module.css';

export function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        dob: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [age, setAge] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const calculateAge = (dob) => {
        if (!dob) return { error: "Date of Birth is required." };
        
        const birthDate = new Date(dob);
        if (isNaN(birthDate)) return { error: "Invalid Date of Birth." };

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return { age, error: age >= 0 ? null : "Invalid Date of Birth." };
    };

    const validate = () => {
        const errors = {};
        const usernameError = isValidUsername(formData.username);
        const emailError = isValidEmail(formData.email);
        const passwordError = isValidPassword(formData.password);
        const dobValidation = calculateAge(formData.dob);

        if (usernameError !== true) errors.username = usernameError;
        if (emailError !== true) errors.email = emailError;
        if (passwordError !== true) errors.password = passwordError;
        if (dobValidation.error) errors.dob = dobValidation.error;

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        setErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            setAge(calculateAge(formData.dob).age);
            setIsSubmitted(true);
            navigate('/');
        }
    };

    const isValidUsername = (username) => {
        if (!username.trim()) return 'Username is required.';
        if (username.length > 25) return 'The text is too long, please write shorter!';
        if (/[^a-zA-Z]/.test(username)) return 'Username cannot contain numbers or special characters.';
        if (username === username.toUpperCase()) return 'Username cannot contain uppercase letter.';
        return true;
    };

    const isValidEmail = (email) => {
        if (!email.trim()) return 'Email is required.';
        if (email.length < 6) return 'Email is too short.';
        if (email.length > 30) return 'Email is too long.';
        const atCount = email.split('@').length - 1;
        if (atCount !== 1) return "Email must contain one @ symbol.";
        if (email.indexOf('.') === -1) return "The email must contain a dot.";
        return true;
    };

    const minPasswordLength = 4;
    const isValidPassword = (password) => {
        if (!password.trim()) return "Password is required.";
        if (password.length < minPasswordLength) return "The password must be at least 4 characters.";
        return true;
    };

    return (
        <div className={style.center}>
            <div className={style.main}>
                {/* ERROR */}
                {Object.keys(errors).length > 0 && (
                    <div className={style.error}>
                        <div>
                            <i className={style.red}><BiError size="5rem" /></i>
                        </div>
                        <div id="error">
                            <h4 className={style.redTitle}>There was a problem:</h4>
                            <ul>
                                {errors.username && <li className={style.errorLi}>{errors.username}</li>}
                                {errors.email && <li className={style.errorLi}>{errors.email}</li>}
                                {errors.password && <li className={style.errorLi}>{errors.password}</li>}
                                {errors.dob && (
                                    <li className={style.errorLi}>
                                        {errors.dob} {typeof age === 'number' && `Calculated Age: ${age}`}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
                {/* Entered Data */}
                {isSubmitted && Object.keys(errors).length === 0 && (
                    <div className={style.error}>
                        <div>
                            <i className={style.red}><FaCheck size="3rem" /></i>
                        </div>
                        <div id="successful">
                            <h4 className={style.redTitle}>Your data has been successfully registered:</h4>
                            <ul>
                                {formData.username && <li className={style.errorLi}><strong>Username:</strong> {formData.username}</li>}
                                {formData.email && <li className={style.errorLi}><strong>Email:</strong> {formData.email}</li>}
                                {formData.dob && <li className={style.errorLi}><strong>Age:</strong> {age}</li>}
                            </ul>
                        </div>
                    </div>
                )}
                <div className={style.form}>
                    <form onSubmit={handleSubmit} className={style.context}>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="username">Your name:</label>
                            <input value={formData.username} onChange={handleChange} name="username" id="username" className={style.input} type="text" placeholder="First and last name" disabled={isSubmitted} />
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="email">Email:</label>
                            <input value={formData.email} onChange={handleChange} name="email" id="email" className={style.input} type="email" placeholder="" disabled={isSubmitted} />
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="password">Password:</label>
                            <input value={formData.password} onChange={handleChange} name="password" id="password" className={style.input} type="password" placeholder="at least 4 characters" disabled={isSubmitted} />
                        </div>
                        <div className={style.formRow}>
                            <label className={style.label} htmlFor="dob">Date of Birth:</label>
                            <input className={style.input} type="text" pattern="\d{4}/\d{2}/\d{2}" placeholder="YYYY/MM/DD" name="dob" value={formData.dob} onChange={handleChange} id="dob" disabled={isSubmitted} />
                        </div>
                        <div className={style.formRow}>
                            <button className={`${style.button} ${style.textButton}`} type="submit">Create your account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;