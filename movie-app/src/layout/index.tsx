import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";


const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header onSearch={(query: string) => console.log(query)} />
            <main className="flex-grow p-6">
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
};

export default Layout;