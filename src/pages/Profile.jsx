import React, { useContext } from "react";
import { context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, loader } = useContext(context);

  return loader ? (
    <Loader />
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-200 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl text-center mb-6">Profile</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={user.username}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Full Name:</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={user.fullname}
            readOnly
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            value={user.email}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
