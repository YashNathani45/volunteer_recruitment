import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// function Teach_Log() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const navigate = useNavigate();

//   const { email, password } = formData;

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/login_teacher', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data); // Handle login success
//         navigate('/teach_dashboard'); // Redirect to teacher_dashboard
//       } else {
//         const errorData = await response.json();
//         console.error('Login failed:', errorData.msg);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };
function Teach_Log() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('https://volunteer-recruitment.vercel.app/api/login_teacher', { email, password });
      if (response.status === 200 && response.data && response.data.token) {
        const { token } = response.data;
        localStorage.setItem('teachertoken', token);
        toast.success('Login successful!')
        navigate('/create');
      } else {
        toast.error('Invalid credentials!!')
      }
    } catch (e) {
      toast.error('Invalid credentials!!')
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <Toaster />
      <form className="max-w-sm w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg" onSubmit={handleLoginSubmit}>
        <div className="space-y-6">
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Staff Member Login</h5>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              placeholder="name@company.com" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
              required 
            />
          </div>
          <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Login</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
            Not a teacher? <Link to='/tregister' className="text-blue-700 hover:underline dark:text-blue-500">Sign Up</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Teach_Log;
