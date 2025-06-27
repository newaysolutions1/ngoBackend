const express = require('express');
const router = express.Router();

const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
} = require('../../controllers/patient.controller.js');

const verifyToken = require('../../middlewares/auth.middleware.js');

router.post('/', verifyToken, createPatient);
router.get('/', verifyToken, getAllPatients);
router.get('/:id', verifyToken, getPatientById);
router.put('/:id', verifyToken, updatePatientById);
router.delete('/:id', verifyToken, deletePatientById);

module.exports = router;
