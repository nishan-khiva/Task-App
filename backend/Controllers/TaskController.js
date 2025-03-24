const TaskDB = require('../Models/TaskSchema')

//create 
const createTask = async (req, res) => {
    const data = req.body;
    console.log("Received Data:", data);
    try {
        const model = new TaskDB({
            ...data,
            userId: req.user._id,       
            username: req.user.username,
        });
        await model.save();
        res.status(201).json({ message: "Task created successfully", success: true, model });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ message: "Failed to create task", success: false });
    }
};


// Fetch All, Completed, Incompleted, or Important Tasks
const FetchAllTask = async (req, res) => {
    try {
        let filter = { userId: req.user._id };
        if (req.query.complete) {
            filter.complete = req.query.complete === "true"; // Convert to boolean
        }
        if (req.query.important) {
            filter.important = true; // Convert to boolean
        }
        const data = await TaskDB.find(filter);
        res.status(200).json({ message: "Filtered Tasks", data });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};

//update & Edit
const updatetask = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        await TaskDB.findByIdAndUpdate(id, obj);
        res.status(200).json({ message: "update tha data" });
    } catch (err) {
        res.status(500).json({ message: "no updated" });
    }
}
//delete
const deletetask = async (req, res) => {
    try {
        const id = req.params.id;
        await TaskDB.findByIdAndDelete(id);
        res.status(200).json({ message: "delete data" });
    } catch (err) {
        res.status(500).json({ message: "no deleted" });
    }
}

const count = async (req, res) => {
    try {
        const total = await TaskDB.countDocuments({ userId: req.user._id });
        const completed = await TaskDB.countDocuments({ userId: req.user._id, complete: true });   // Fixed field name
        const incomplete = await TaskDB.countDocuments({ userId: req.user._id, complete: false }); // Fixed field name
        const important = await TaskDB.countDocuments({ userId: req.user._id, important: true });

        res.json({
            total,
            completed,
            incomplete,
            important
        });

    } catch (error) {
        console.error("Error fetching task count:", error);
        res.status(500).send('Server Error');
    }
};

module.exports = { createTask, FetchAllTask, updatetask, deletetask, count };


