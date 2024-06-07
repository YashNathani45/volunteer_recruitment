import React, { useEffect, useState } from 'react';
import Navbar from './Navabar';
import { Link } from 'react-router-dom';
function User_Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage or API
    const fetchUserDetails = async () => {
      const userDetails = JSON.parse(localStorage.getItem('userDetails'));
      if (userDetails) {
        setUser(userDetails);
      } else {
        // Placeholder for API call to fetch user details
        // const response = await fetch('API_ENDPOINT');
        // const data = await response.json();
        // setUser(data);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-20 container mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome, {user ? user.name : 'User'}!</h1>
        <div className="text-center mb-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            This is your dashboard where you can view and manage your opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Discover Opportunities</h2>
            <p className="text-gray-700 dark:text-gray-300">Explore and discover new opportunities.</p>
            <Link to="/discover" className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Discover Now
            </Link>
          </div>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Applied Opportunities</h2>
            <p className="text-gray-700 dark:text-gray-300">View opportunities you have applied for.</p>
            <Link to="/applied-opportunities" className="mt-4 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700">
              View Applied Opportunities
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default User_Dashboard;
