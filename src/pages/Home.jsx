import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { context, server } from "../main";
import toast from "react-hot-toast";
import ToDoItem from "../components/ToDoItems";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(context);

  const handleUpdate = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${server}/tasks/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (e) {
      toast.error(e.data.response.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setLoading(false);
      setRefresh((prev) => !prev);
    } catch (e) {
      toast.error(e.data.response.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(title, description);
      const { data } = await axios.post(
        `${server}/tasks/create`,
        {
          taskname: title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      setLoading(false);
      setRefresh((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/tasks/me`, { withCredentials: true })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) <Navigate to="/login" />;

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add ToDo
            </button>
          </div>
        </form>
        <section className="mt-8">
          {tasks.map((task) => (
            <ToDoItem
              key={task._id}
              title={task.taskname}
              description={task.description}
              isCompleted={task.isCompleted}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              id={task._id}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
