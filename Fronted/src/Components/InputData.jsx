import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const InputData = ({ InputDiv, setInputDiv, editTask, setEditTask,refresh }) => {
    const [task, setTask] = useState({ tittle: "", desc: "" });
    useEffect(() => {
        if (editTask) {
            setTask({ tittle: editTask.tittle, desc: editTask.desc });
        } else {
            setTask({ tittle: "", desc: "" });
        }
    }, [editTask]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,  
                    'Content-Type': 'application/json'
                }
            };
            if (editTask) {
                await axios.put(`https://task-app-adqr.onrender.com/api/task/${editTask._id}`, task, config);
                setEditTask(null);
            } else {
                await axios.post("https://task-app-adqr.onrender.com/api/task/", task, config);
            }
            setTask({ tittle: "", desc: "" });
            setInputDiv("hidden");
            await refresh();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create");
        }
    };
    return (
        <div className={`${InputDiv} fixed top-0 left-0 h-screen w-full testNaim`}>
            <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-full">
                <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-2xl mx-4 sm:mx-6 md:mx-0">
                    <button
                        onClick={() => { setInputDiv("hidden"); setEditTask(null); }}
                        className="text-white float-right"
                    >
                        <FaTimes size={22} />
                    </button>
                    <h2 className="text-white text-center text-lg font-semibold mb-4">
                        {editTask ? "Update Task" : "Add New Task"}
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="tittle"
                            value={task.tittle}
                            onChange={handleChange}
                            placeholder="Title"
                            className="rounded p-2 w-full text-white bg-gray-600 border border-gray-500 mb-2"
                        />
                        <textarea
                            name="desc"
                            value={task.desc}
                            onChange={handleChange}
                            placeholder="Description.."
                            className="rounded p-2 w-full text-white bg-gray-600 border border-gray-500 mb-2"
                            rows="4"
                        />
                        <button type="submit"
                            className="bg-sky-500 hover:bg-sky-600 rounded px-4 py-2 font-semibold w-full text-white">
                            {editTask ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputData;
