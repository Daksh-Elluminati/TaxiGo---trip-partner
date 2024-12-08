import { useRouter } from "next/router";

const Logout: React.FC = () => {
    const router = useRouter();
    localStorage.clear();
    router.push('/login');
    return (<></>);
}

export default Logout