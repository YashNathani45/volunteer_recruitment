
import './App.css';
import Create_opportunities from './components/Create_opportunities';
import Login from './components/Login';
import Navabar from './components/Navabar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Landing from './components/Landing';
import User_Dashboard from './components/User_Dashboard';
import Teach_Reg from './components/Teach_Reg';
import Teach_Log from './components/Teach_Log';
import Teach_Dashboard from './components/Teach_Dashboard';

import ViewOpportunities from './components/TeacherOpportunities';
import VolunteerOpportunities from './components/VolunteerOpportunities';
import AppliedOpportunities from './components/AppliedOpportunities';
import SignupForm from './components/SignupForm';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<Create_opportunities />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user_dashboard" element={<User_Dashboard />} />
      <Route path="/teach_dashboard" element={<Teach_Dashboard />} />
      <Route path="/tregister" element={<Teach_Reg />} />
      <Route path="/tlogin" element={<Teach_Log />} />
      <Route path="/opportunities" element={<ViewOpportunities/>} />
      <Route path="/volunteeropportunities" element={<VolunteerOpportunities/>} />
      <Route path="/appliedopportunities" element={<AppliedOpportunities/>} />
      <Route path="/signup/:opportunityId" element={<SignupForm/>} />
    </Routes>
  </Router>
  );
}

export default App;
