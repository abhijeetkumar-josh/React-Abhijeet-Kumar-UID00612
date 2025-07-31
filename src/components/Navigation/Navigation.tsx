import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { logout } from '@store/authSlice';
import './Navigation.css';

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {isAuthenticated && location.pathname === '/profile' ? (
          <>
            <li>
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="nav__link nav__link--active">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="nav__button">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/" className="nav__link nav__link--active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav__link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav__link">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
