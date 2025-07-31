// src/routes/AppRouter.tsx
import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '../containers/Layout';
import PrivateRoute from '@components/PrivateRoute/PrivateRoute';
import { lazy } from 'react';

const Home = lazy(() => import('@screens/Wrapper/Wrapper'));
const Login = lazy(() => import('@screens/Login/Login'));
const Profile = lazy(() => import('@screens/Profile/Profile'));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
