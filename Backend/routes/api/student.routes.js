const express = require('express');
const router = express.Router();
const isExist = require('../../middlewares/isExist.js');


const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  updateStudentStatusById
} = require('../../controllers/student.controller.js');
const { uploadMultiple } = require('../../middlewares/upload.js');

router.post('/', uploadMultiple, isExist, createStudent);
router.get('/', getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', uploadMultiple, updateStudentById);
router.put('/status/:id', updateStudentStatusById);
router.delete('/:id', deleteStudentById);

module.exports = router;
