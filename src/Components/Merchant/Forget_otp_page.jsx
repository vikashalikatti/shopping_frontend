import React, { useState } from 'react';
import axiosInstance from '../../AXIOS/AxiosInstance';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Forget_otp_page = () => {
    let { email } = useParams();
    let location = useLocation();
    let queryParams = new URLSearchParams(location.search);
    let otpFromQuery = queryParams.get('otp');

    const [otp, setOTP] = useState('');
    const [isVerificationSuccess, setVerificationSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setOTP(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const otpValue = parseInt(otp, 10);
            const response = await axiosInstance.post(`/merchant/forgot-otp/${email}?otp=${otpValue}`);
            // console.log('OTP verification successful:', response.data);
            alert("OTP verification successful")
            // Set verification success state to true
            setVerificationSuccess(true);
        } catch (err) {
            // console.log('OTP verification failed:', err);
            alert("OTP verification failed")
        }
    };

    const handleResend = async () => {
        try {
            const response = await axiosInstance.get(`/merchant/resend-forgot-otp/${email}`);
            // console.log('OTP resend successful:', response.data);
            alert("OTP resend successful")
            // Handle the resend action, e.g., showing a message to the user
        } catch (err) {
            // console.log('OTP resend failed:', err);
            alert("OTP resend failed")
        }
    };

    if (isVerificationSuccess) {
        // localStorage.setItem('email', email); 
        navigate('/resetpassword', { state: { email: email } });
    }

    return (
        <div>
            <form method="post" onSubmit={handleSubmit}>
                <h1>Enter OTP</h1>
                <input type="number" name="otp" value={otp} onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleResend}>Resend OTP</button>
        </div>
    );
};

export default Forget_otp_page;
