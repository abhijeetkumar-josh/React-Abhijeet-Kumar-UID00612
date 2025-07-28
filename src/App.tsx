import Wrapper from "./components/Wrapper/Wrapper.tsx";
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import LoginForm from "./components/Login/Login.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import Profile from "./components/Profile/Profile.tsx";

import "./App.css"

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Wrapper/>} />
          <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
