import { Link } from 'react-router-dom';

export const NoPage: React.FC = () => {
    return (
        <div className="text-center mt-12 bg-slate-500 text-white p-8 rounded-lg">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-4">Page not found</p>
            <Link to="/" className="text-black hover:underline mt-6 block">Go to Home</Link>
        </div>
    );
}