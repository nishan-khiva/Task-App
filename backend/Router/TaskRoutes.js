const router = require('express').Router();
const { createTask, FetchAllTask, updatetask, deletetask, count} = require('../Controllers/TaskController');
const auth = require('../Middleware/Auth');


router.post('/', auth, createTask);       //create data
router.get('/', auth, FetchAllTask);     //fetch all data
router.put('/:id', auth, updatetask);     //update data
router.delete('/:id', auth, deletetask);   //delete data

//count 
router.get('/count', auth, count);

module.exports = router;
