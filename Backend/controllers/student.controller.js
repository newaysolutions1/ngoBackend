const Student = require('../models/student.model.js');
const { AVATAR, ERROR } = require('../constants.js');

// @desc    Create a new student
// @access  Public
const createStudent = async (req, res) => {
  try {
    const payload = req.body;
    const { image, resume, identity, certificate } = req.files;

    const uploadedFiles = {
      image: image?.[0]?.filename || AVATAR,
      resume: resume?.[0]?.filename || '',
      identity: identity?.[0]?.filename || '',
      certificate: certificate?.[0].filename || '',
    };

    const student = await Student.create({ ...payload, ...uploadedFiles });

    return res.status(201).json({
      success: true,
      message: 'Student and documents uploaded successfully',
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ERROR,
      error: error.message,
    });
  }
};

// @desc    Get all students
// @access  Private
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .select('name email status createdAt')
      .sort('createdAt');

    res.status(200).json({
      status: 200,
      success: true,
      data: students,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: ERROR, error: error.message });
  }
};

// @desc    Get a student by ID
// @access  Private
const getStudentById = async (req, res) => {  
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: student,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: ERROR, error: error.message });
  }
};

// @desc    Update a student by ID
// @access  Private
const updateStudentById = async (req, res) => {
  const data = req.body;
  const { video } = req.files || {};

  try {
    // Prepare payload
    const payload = {
      name: data.name,
      address: data.address,
      age: data.age,
      gender: data.gender,
      institution: data.institution,
      course: data.course,
      year: data.year,
      performanceScore: data.performanceScore,
      support: data.support,
      challange: data.challange,
      goal: data.goal,
      communicationMode: data.communicationMode,
    };

    // If video file is present, update it
    if (video && video[0]) {
      payload.video = video[0].filename;
    }

    const student = await Student.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: ERROR, error: error.message });
  }
};



const updateStudentStatusById = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, {status: req?.body?.status}, {
      new: true,
    });

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message });
  }
};
// @desc    Delete a student by ID
// @access  Private
const deleteStudentById = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: 'Student not found' });
    }

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: ERROR, error: error.message });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  updateStudentStatusById
};
