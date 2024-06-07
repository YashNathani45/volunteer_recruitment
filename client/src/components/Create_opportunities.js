import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Teach_Nav from "./Teach_Nav";
import toast, { Toaster } from 'react-hot-toast';
function CreateOpportunities() {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
    state: "",
    city: "",
    startDate: null,
    endDate: null,
    lastDayToApply: null,
    hoursPerDay: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('teachertoken'); // Assuming you store the token in localStorage

    try {
      const response = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
        body: JSON.stringify({ ...formData }), // Include teacherId in the request body
      });
      
      if (response.ok) {
        toast.success("Opportunity created successfully!");
        // Reset form data after successful submission
        setFormData({
          email: "",
          title: "",
          description: "",
          state: "",
          city: "",
          startDate: null,
          endDate: null,
          lastDayToApply: null,
          hoursPerDay: "",
        });
      } else {
        toast.error("Error creating opportunity.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="mt-20">
      <Teach_Nav />
      <div className="mt-10 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create Opportunities</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
              Your Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="name@flowbite.com"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Opportunity Title
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Opportunity Title"
              value={formData.title}
              onChange={handleChange}
              name="title"
            />

  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Opportunity Description
  </label>
  <textarea
    id="message"
    rows="4"
    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Opportunity Description"
    value={formData.description}
    onChange={handleChange}
    name="description"
  ></textarea>

  <label htmlFor="state-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    State
  </label>
  <input
    type="text"
    id="state-input"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="State"
    value={formData.state}
    onChange={handleChange}
    name="state"
  />

  <label htmlFor="city-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    City
  </label>
  <input
    type="text"
    id="city-input"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="City"
    value={formData.city}
    onChange={handleChange}
    name="city"
  />
  </div>
       

        {/* Date pickers */}
        <div className="mb-4">
            {/* Date pickers */}
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex-1">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-900 dark:text-white">
                  Start Date
                </label>
                <DatePicker
                  selected={formData.startDate}
                  onChange={(date) => setFormData({ ...formData, startDate: date })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-900 dark:text-white">
                  End Date
                </label>
                <DatePicker
                  selected={formData.endDate}
                  onChange={(date) => setFormData({ ...formData, endDate: date })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        <label htmlFor="hours-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    No. of hours/day
  </label>
  <input
    type="number"
    id="hours-input"
    aria-describedby="helper-text-explanation"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Number of hours per day"
    value={formData.hoursPerDay}
    onChange={handleChange}
    name="hoursPerDay"
  />

  <label htmlFor="last-day-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Last Day to Apply
  </label>
  <DatePicker
    id="last-day-input"
    selected={formData.lastDayToApply}
    onChange={(date) => setFormData({ ...formData, lastDayToApply: date })}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  />

        
<button
            type="submit"
            className="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg py-2.5 text-sm focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOpportunities;