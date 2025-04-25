import '../src/index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Pages
import Home from './Pages/Home';
import AllTask from './Pages/AllTask';
import Important from './Pages/Important';
import Completed from './Pages/Completed';
import InCompleted from './Pages/InCompleted';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Profile from './Pages/Profile';
import ChangePassword from './Pages/ChangePassword';

// Private Route
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div className='relative'>
      <Router>
        <Routes>
          {/* पब्लिक रूट्स */}
          <Route path="/" element={<LogIn />} />
            <Route path="*" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* प्राइवेट रूट्स */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />}>
              <Route index element={<AllTask />} />
              <Route path="completed" element={<Completed />} />
              <Route path="incomplete" element={<InCompleted />} />
              <Route path="important" element={<Important />} />
              <Route path="profile" element={<Profile />} />
              <Route path="changepassword" element={<ChangePassword />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
