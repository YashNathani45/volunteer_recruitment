import React, { useState, useEffect } from 'react';
import Navbar from './Navabar';
import { Link } from "react-router-dom";

function VolunteerOpportunities() {
  const [opportunities, setOpportunities] = useState([]);
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  useEffect(() => {
    const fetchOpportunities = async () => {
      const token = localStorage.getItem('volunteertoken');
      try {
        const response = await fetch("https://volunteer-recruitment.vercel.app/api/all-opportunities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Filter out opportunities with passed last day to apply
          const validOpportunities = data.filter(opportunity => {
            const today = new Date();
            const lastDayToApply = new Date(opportunity.lastDayToApply);
            return lastDayToApply >= today;
          });
          setOpportunities(validOpportunities);
        } else {
          console.error("Error fetching opportunities");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const fetchAppliedOpportunities = async () => {
      const token = localStorage.getItem('volunteertoken');
      try {
        const response = await fetch("https://volunteer-recruitment.vercel.app/api/volunteer/applied-opportunities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAppliedOpportunities(data);
        } else {
          console.error("Error fetching applied opportunities");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOpportunities();
    fetchAppliedOpportunities();
  }, []);

  const calculateDaysRemaining = (lastDayToApply) => {
    const today = new Date();
    const lastDay = new Date(lastDayToApply);
    const differenceInTime = lastDay - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <h1 className="text-3xl font-bold text-center">All Opportunities</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {opportunities.map(opportunity => {
            const daysRemaining = calculateDaysRemaining(opportunity.lastDayToApply);
            const alreadyApplied = appliedOpportunities.some(applied => applied._id === opportunity._id);
            return (
              <div key={opportunity._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{opportunity.title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{opportunity.description}</p>
                <p className="flex items-center space-x-2">
                  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"/>
                  </svg>
                  <span>{opportunity.city}, {opportunity.state}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
                  </svg>
                  <span>{new Date(opportunity.startDate).toLocaleDateString()} to {new Date(opportunity.endDate).toLocaleDateString()}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  <span>{opportunity.hoursPerDay} hours/day</span>
                </p>
                <p>Last Day to Apply: {new Date(opportunity.lastDayToApply).toLocaleDateString()}</p>
                {daysRemaining < 10 && (
                  <p className="text-red-500 text-l font-bold">Hurry! Only {daysRemaining} days left to apply.</p>
                )}
                {alreadyApplied ? (
                  <button disabled className="w-full py-2.5 mt-4 bg-gray-500 text-white font-medium rounded-lg text-sm cursor-not-allowed">Already Applied</button>
                ) : (
                  <Link to={`/signup/${opportunity._id}`} className="inline-flex items-center px-3 py-2 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Sign Up
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default VolunteerOpportunities;
