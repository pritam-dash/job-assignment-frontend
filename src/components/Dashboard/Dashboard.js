import React, { useContext, useState } from 'react';
import Header from '../Header';
import Sidebar from '../SideBar';
import CreatePostForm from '../JobPosting/JobForm'; 
import { UserContext } from '../../context/userContext.js';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [isFormVisible, setIsFormVisible] = useState(false); 

  const handleCreatePostClick = () => {
    setIsFormVisible(true); 
  };

  const handleFormSubmit = () => {
    setIsFormVisible(false); 
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {user && <Sidebar />}

      <div className="flex-1 flex flex-col min-h-screen bg-white">
        <Header user={user} />

        {!isFormVisible && (
          <div className="flex flex-col w-full lg:w-[15%] ml-4 p-4 mt-20">
            <button
              onClick={handleCreatePostClick}
              className="mb-4 py-2 ml-10 font-medium text-lg bg-blue-500 text-white rounded hover:bg-blue-700 w-full"
            >
              Create Interview
            </button>
          </div>
        )}

        {isFormVisible && (
          <div className="mt-6 w-full p-4">
            <CreatePostForm onFormSubmit={handleFormSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
