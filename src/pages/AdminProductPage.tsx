import React from "react";

const AdminProductPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Product Management</h1>
      
      <div className="bg-white shadow rounded p-4">
        <p className="text-gray-600">This is the admin product page.</p>
        <p className="text-sm mt-2 text-gray-500">Here, administrators can add, edit, or remove products.</p>
      </div>
    </div>
  );
};

export default AdminProductPage;
