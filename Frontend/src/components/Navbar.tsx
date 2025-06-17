import { useAppDispatch } from '../hooks';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <nav className='bg-gray-800 text-white flex gap-x-36'>
            <ul className='flex gap-x-2'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <button onClick={handleLogout} className="text-red-500 hover:underline">
                Logout
            </button>
        </nav>
    )
}

export default Navbar