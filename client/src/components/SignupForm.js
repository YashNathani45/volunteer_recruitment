import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
function SignupForm() {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    timeCommitment: "",
    note: ""
  });

  // Define opportunityId using useParams from react-router-dom
  const { opportunityId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/opportunities/${opportunityId}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        
      });

      if (response.ok) {
        alert("Signed up successfully!");
        setFormData({
          email: "",
          mobile: "",
          timeCommitment: "", 
          note: ""
        });
        navigate('/appliedopportunities');
      } else {
        alert("Error signing up.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <form className="max-w-sm w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@gmail.com"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block mb-1 font-semibold">Mobile:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              placeholder="+91"
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="timeCommitment" className="block mb-1 font-semibold">Time Commitment:</label>
            <input
              type="text"
              id="timeCommitment"
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block mb-1 font-semibold">Previous Volunteering Experience:</label>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              required
              placeholder="Experience..."
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg text-sm hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
        </div>
      </form>
      <Link
        to="/volunteeropportunities"
        className="mt-4 text-blue-600 hover:underline dark:text-blue-400"
      >
        Home
      </Link>
    </div>
  );
}

export default SignupForm;