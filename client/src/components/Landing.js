import React from 'react';
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Welcome to TeachForIndia
      </h1>
      <p className="text-xl mb-8 text-gray-800 dark:text-gray-200 text-center max-w-2xl">
        Join us in our mission to provide quality education to every child in India.
      </p>
      <div className="flex flex-col md:flex-row justify-around w-full max-w-4xl mb-8 space-y-8 md:space-y-0">
        <div className="text-center mx-4 p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Volunteers</h2>
          <p className="text-lg text-gray-900 dark:text-gray-300 mb-4">
            Volunteers support our classrooms by providing additional help and mentorship to students, assisting with events, and bringing their unique skills to various projects.
          </p>
          <Link 
            to="/login" 
            type="button" 
            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
          >
            Become a Volunteer
          </Link>
        </div>
        <div className="text-center mx-4 p-6 bg-gray-100 dark:bg-gray-700 shadow-lg rounded-lg transform transition duration-500 hover:scale-105">
  <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300">Fellows and Staff members</h2>
  <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
    Fellows and Staff members play a vital role by creating volunteering opportunities, leading initiatives, and making a positive impact on communities through education and empowerment.
  </p>
  <Link 
    to="/tlogin" 
    type="button" 
    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
  >
    Join as a Fellow or Staff member
  </Link>
</div>

      </div>
    </div>
  )
}

export default Landing;
