// Register.js
import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import '../styles/register.css'; // Import your custom CSS file for styling

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        date: '',
        gender: '',
        address: '',
        pic: null,
    });
    const { email } = data;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData({ ...data, pic: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('mobile', data.mobile);
            formData.append('password', data.password);
            formData.append('date', data.date);
            formData.append('gender', data.gender);
            formData.append('address', data.address);
            formData.append('pic', data.pic); // Append the uploaded file

            const response = await axiosInstance.post('/merchant/signup', formData);
            console.log('OTP successful:', response.data);
            alert('OTP Send Successfully');
            navigate(`/merchant/verify-otp/${email}`);
        } catch (err) {
            console.error('OTP failed:', err);
            alert('OTP Not Sent');
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
            <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={data.name} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={data.email} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="text" id="mobile" name="mobile" value={data.mobile} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={data.password} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="date">Date of Birth</label>
                    <input type="date" id="date" name="date" value={data.date} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label>Gender</label>
                    <div className="radio-group">
                        <label>
                            <input type="radio" name="gender" value="male" onChange={handleChange} />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="female" onChange={handleChange} />
                            Female
                        </label>
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" name="address" value={data.address} onChange={handleChange} />
                </div>
                <div className="input-group">
                    <label htmlFor="pic">Profile Picture</label>
                    <input type="file" id="pic" name="pic" onChange={handleFileChange} />
                </div>
                <div className="input-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Register;
