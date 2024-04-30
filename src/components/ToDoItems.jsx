import React from "react";

const ToDoItem = ({
  title,
  description,
  isCompleted,
  handleUpdate,
  handleDelete,
  id,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex items-center">
          <input
            onChange={() => handleUpdate(id)}
            type="checkbox"
            className="mr-6 form-checkbox h-8 w-8 text-blue-500"
            checked={isCompleted}
          />
          <button
            onClick={() => handleDelete(id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoItem;
