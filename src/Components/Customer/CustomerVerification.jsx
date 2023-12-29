import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../AXIOS/AxiosInstance';

function CustomerVerification() {
  const { email, token } = useParams();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleResendClick = async () => {
    const requestUrl = `/customer/resend_link/${email}`;
    console.log('Request URL:', requestUrl);
    
    try {
      const response = await axios.get(requestUrl);
      console.log('Response:', response);
      
      if (response.status === 200) {
        alert('Verification link resent successfully!');
      } else {
        alert('Failed to resend verification link.');
      }
    } catch (error) {
      console.error('Error resending verification link:', error);
      alert('An error occurred while resending the verification link.');
    }
  };
  
  

  useEffect(() => {
    axios
      .get(`/customer/verify-link/${email}/${token}`)
      .then((response) => {
        if (response.status === 201) {
          alert('Account verified successfully!');
          navigate('/login/customer');
        } else {
          setVerificationStatus('Account verification failed.');
        }
      })
      .catch((error) => {
        console.error('Error verifying account:', error);
        setVerificationStatus('An error occurred while verifying the account.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, token, navigate]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : verificationStatus === null ? (
        <p>Verifying account...</p>
      ) : (
        <p>{verificationStatus}</p>
      )}
      <button onClick={handleResendClick}>Resend Verification Link</button>
    </div>
  );
}

export default CustomerVerification;
