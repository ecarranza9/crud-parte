const express = require('express');
const router = express.Router();
const PartController = require('../controllers/part.controller')


router.get('/part',PartController.getAllParts);
router.post('/part',PartController.createPart);
router.put('/part/:id',PartController.updatePart)



module.exports = router;