const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task.controller');

router.post('/task/:id',TaskController.createTask);
router.put('/task/:id/:idTask',TaskController.updateTask);
router.delete('/task/:id/:idTask',TaskController.deleteTask);







module.exports = router;