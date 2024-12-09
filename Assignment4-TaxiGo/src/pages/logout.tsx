import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Clear localStorage and redirect to login
    localStorage.clear();
    history.push('/login');
  }, [history]);

  return null;
};

export default Logout;
