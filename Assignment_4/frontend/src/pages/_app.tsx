import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles globally
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {

  
  return (
    <>
    <ToastContainer />
    </>
  );
};

export default MyApp;
