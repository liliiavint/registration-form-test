import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiInfoLarge } from 'react-icons/ti';
import { BiError } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';
import style from './App.module.css';

export function RegistrationForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [repeatPasswordErr, setRepeatPasswordErr] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        dob: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const calculateAge = (dob) => {
        if (!dob) {
            return "Date of Birth is required.";
        }
    
        const birthDate = new Date(dob);
        if (isNaN(birthDate)) {
            return "Invalid Date of Birth.";
        }
    
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        if (age < 18) {
            return "You must be at least 18 years old.";
        }
    
        return true;
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);

        const usernameErrorValue = isValidUsername(username);
        const emailErrorValue = isValidEmail(email);
        const passwordErrorValue = isValidPassword(password);
        const repeatPasswordErrorValue = isValidRepeatPassword(repeatPassword);
        const dobErrorValue = calculateAge(formData.dob);

        let isAllFormValid = true;
        let newErrors = {};

        if (usernameErrorValue !== true) {
            isAllFormValid = false;
            setUsernameErr(usernameErrorValue);
        } else {
            setUsernameErr('');
        }

        if (emailErrorValue !== true) {
            isAllFormValid = false;
            setEmailErr(emailErrorValue);
        } else {
            setEmailErr('');
        }

        if (passwordErrorValue !== true) {
            isAllFormValid = false;
            setPasswordErr(passwordErrorValue);
        } else {
            setPasswordErr('');
        }

        if (repeatPasswordErrorValue !== true) {
            isAllFormValid = false;
            setRepeatPasswordErr(repeatPasswordErrorValue);
        } else {
            setRepeatPasswordErr('');
        }

        if (dobErrorValue !== true) {
            isAllFormValid = false;
            newErrors = { ...errors, dob: dobErrorValue };
        }

        if (isAllFormValid) {
            navigate('/');
        } else {
            setErrors(newErrors);
        }
    };

    function handleUsernameChange(e) {
        setUsername(e.target.value);
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleRepeatPasswordChange(e) {
        setRepeatPassword(e.target.value);
    }

    function CapsLock(username) {
        return username === username.toUpperCase();
    }

    function isValidUsername(username) {
        if (!username.trim()) {
            return 'Username is required.';
        }
        if (username.length > 25) {
            return 'The text is too long, please write shorter!';
        }
        if(typeof username === 'number'){
            return 'Username cannot contain numbers.';
        }
        if(CapsLock(username)){
            return 'Username cannot contain uppercase letter.';
        }
        const symbol = [',', ':', '*', '&', '^', '%', '$', '#', '@', '!'];
        if (symbol.some(n => username.includes(n))) {
            return 'Username cannot contain special characters , : * & ^ % $ # @ !';
        }

        return true;
    }

    function isValidEmail() {
        if (!email.trim()) {
            return 'Email is required.';         
        }
        if (email.length < 6) {
            return 'Email is too shorter.';
        }
        if (email.length > 30) {
            return 'Email is too long.';
        }
        const atCount = email.split('@').length - 1;
        if (atCount === 0) {
            return 'Email must contain @.';
        }
        if (atCount !== 1) {
            return "Email cannot contain more than one @ symbols.";
        }
        if (email.indexOf('.') === -1) {
            return "The email must contain a character dot."; 
        }
        return true;
    }

    const minPasswordLength = 4;

    function isValidPassword() {
        if (!password.trim()) {
            return "Password is required.";         
        }
        if (password.length < minPasswordLength) {
            return "The passwords must be at least 4 characters.";
        }

        return true;
    }

    function isValidRepeatPassword() {
        if (password !== repeatPassword) {
            return 'The passwords do not match.';
         }
         return true;
    }

    return (
    <div className={style.center}>
        <div className={style.main}>        
            {/* ERROR */}
    {(emailErr || usernameErr || passwordErr || repeatPasswordErr || errors.dob) &&
        <div className={style.error}>
            <div>
                <i className={style.red}><BiError size="5rem" /> </i>
            </div>
            <div>
                <h4 className={style.redTitle}>There was a problem</h4>
                <ul>
                    {emailErr && <li className={style.errorLi}>{emailErr}</li>}
                    {usernameErr && <li className={style.errorLi}>{usernameErr}</li>}
                    {passwordErr && <li className={style.errorLi}>{passwordErr}</li>}
                    {repeatPasswordErr && <li className={style.errorLi}>{repeatPasswordErr}</li>}
                    {errors.dob && <li className={style.errorLi}>{errors.dob}</li>}
                </ul>
            </div>
        </div>
    }
    {/* Entered Data */}
    {isSubmitted && !emailErr && !usernameErr && !passwordErr && !repeatPasswordErr && !errors.dob &&(
            <div className={style.error}>
                <div>
                    <i className={style.red}><FaCheck icon="fa-duotone fa-check" size="3rem" /></i>
                </div>
                <div>
                    <h4 className={style.redTitle}>Your data has been successfully registered:</h4>
                    <ul>
                        {username && <li className={style.errorLi}>Username: {username}</li>}
                        {email && <li className={style.errorLi}>Email: {email}</li>}
                        {formData.dob && <li className={style.errorLi}>Date of Birth: {formData.dob}</li>}
                    </ul>
                </div>
            </div>
            )}
    <div className={style.form}>
          <form onSubmit={handleFormSubmit} className={style.context}>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Your name</label>
                  <input value={username} onChange={handleUsernameChange} className={style.input} type="text" placeholder="First and last name" disabled={isSubmitted}/>
              </div>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Email</label>
                  <input value={email} onChange={handleEmailChange} className={style.input} type="email" placeholder="" disabled={isSubmitted}/>                  
              </div>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Password</label>
                  <input value={password} onChange={handlePasswordChange} className={style.input} type="password" placeholder="at least 4 charachters" disabled={isSubmitted}/>
                  <div className={style.minPassword}>
                      <i className={style.blue}><TiInfoLarge size="1.5rem" /> </i>
                      <p>Passwords must be at least 4 characters.</p>
                  </div>
              </div>
              <div className={style.formRow}>
                  <label className={style.label} htmlFor="">Re-enter password</label>
                  <input value={repeatPassword} onChange={handleRepeatPasswordChange} className={style.input} type="password" placeholder=" " disabled={isSubmitted}/>
              </div>
                <div className={style.formRow}>
                <label  className={style.label}>Date of Birth:</label>
                <input
                    className={style.input} 
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    disabled={isSubmitted}
                />
                <p>Registration is only for users, who are over 18 years old.</p>
                {/* {errors.dob && <p className="error">{errors.dob}</p>} */}
                </div>
              <div className={style.formRow}>
                  <button className={`${style.button} ${style.textButton}`}  type="submit">Create your account</button>
              </div>
              <div className={style.haveAccount}>
                  
              </div>
          </form>
      </div>
  </div>
</div>
);                                                 
}
export default RegistrationForm
