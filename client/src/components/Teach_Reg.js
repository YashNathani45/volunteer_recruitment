import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
function Teach_Reg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
  });

  const { firstName, lastName, email, password, contactNumber } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register_teacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); 
        navigate('/tlogin');
        toast.success('Registration successful!');// Handle registration success
      } else {
        toast.error('Registration failed');
      }
    } catch (err) {
      toast.error('Registration failed');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <Toaster />
      <form className="max-w-sm w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg" onSubmit={onSubmit}>
        <div className="space-y-6">
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Register as a Staff Member</h5>
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
            <input type="text" name="firstName" value={firstName} onChange={onChange} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
            <input type="text" name="lastName" value={lastName} onChange={onChange} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" value={email} onChange={onChange} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input type="password" name="password" value={password} onChange={onChange} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Number</label>
            <input type="number" name="contactNumber" value={contactNumber} onChange={onChange} className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="999888" required />
          </div>
          <button type="submit" className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Register</button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
            Already registered? <Link to="/tlogin" className="text-blue-700 hover:underline dark:text-blue-500">Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Teach_Reg;

