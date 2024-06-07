// Frontend code - AppliedOpportunities.js
import React, { useEffect, useState } from 'react';
import Navbar from './Navabar';

function AppliedOpportunities() {
  const [appliedOpportunities, setAppliedOpportunities] = useState([]);

  useEffect(() => {

    fetchAppliedOpportunities();
  }, []);

  const fetchAppliedOpportunities = async () => {
    try {
      const token = localStorage.getItem('volunteertoken');
      const response = await fetch('https://volunteer-recruitment.vercel.app/api/volunteer/applied-opportunities', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAppliedOpportunities(data);
    } catch (error) {
      console.error('Error fetching applied opportunities:', error);
      // Handle error
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <h1 className="text-3xl font-bold text-center">Applied Opportunities</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {appliedOpportunities.length > 0 ? (
            appliedOpportunities.map(opportunity => (
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
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400 py-8 mx-auto max-w-lg">
  <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
    <svg className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12s-4-8-10-8S2 12 2 12s4 8 10 8 10-8 10-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <h3 className="text-xl font-bold mt-4">No opportunities applied yet.</h3>
    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">Explore and apply for opportunities to get started!</p>
  </div>
</div>

          )}
        </div>
      </div>
    </div>
  );
}
export default AppliedOpportunities;
