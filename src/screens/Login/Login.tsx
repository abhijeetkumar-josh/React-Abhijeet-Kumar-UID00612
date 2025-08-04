import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@store/authSlice';
import { AppDispatch, RootState } from '@store/store';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  let { loading, error } = useSelector((state: RootState) => state.auth);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = username.current?.value;
    const pass = password.current?.value;
    const result = await dispatch(loginUser({ username: user, password: pass }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/profile');
      if (username.current) username.current.value = '';
      if (password.current) password.current.value = '';
    }
    else{
      if (password.current) password.current.value = '';  
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2 className="login-title">Login</h2>
      <input type="text" placeholder="Username" ref={username} className="login-input" />

      <input type="password" placeholder="Password" ref={password} className="login-input" />

      <button
        data-testid="login-Button"
        type="submit"
        disabled={loading}
        className="primary--button"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {error && <p className="login-error">{error}</p>}
    </form>
  );
};

export default Login;
