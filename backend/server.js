require('dotenv').config();
const express = require('express');
require('./Models/Connection');
const cors = require('cors');
const UserAPI = require('./Router/UserRoutes');
const TaskAPI = require('./Router/TaskRoutes');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

app.use('/api', UserAPI);
app.use('/api/task', TaskAPI);

app.get('/', (req, res) => {
    res.send("hello this is server page");
})

app.listen(PORT, () => {
    console.log(`Server is Start ${PORT}`);
})