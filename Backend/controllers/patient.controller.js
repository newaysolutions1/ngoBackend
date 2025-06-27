const Patient = require('../models/patient.model.js');

// @desc    Create a new patient
// @access  Public
const createPatient = async (req, res) => {
  try {
    const { name, age, gender, contact, diagnosis } = req.body;

    // validate required fields
    if (!name || !age || !gender || !contact) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'All required fields must be provided',
        data: null,
      });
    }

    const payload = { name, age, gender, contact, diagnosis };
    const patient = await Patient.create(payload);

    return res.status(201).json({
      status: 201,
      success: true,
      message: 'Patient created successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal Server error',
    });
  }
};

// @desc    Get all patients
// @access  Public
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Patients fetched successfully',
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Server error',
      data: null,
    });
  }
};

// @desc    Get patient by ID
// @access  Public
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req?.params?.id);

    if (!patient) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Patient fetched successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal Server error',
    });
  }
};

// @desc    Update patient by ID
// @access  Public
const updatePatientById = async (req, res) => {
  try {
    const { name, age, gender, contact, diagnosis } = req.body;
    const payload = { name, age, gender, contact, diagnosis };

    const patient = await Patient.findByIdAndUpdate(req.params.id, payload, {
      new: true,
    });

    if (!patient) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal Server error',
    });
  }
};

// @desc    Delete patient by ID
// @access  Public
const deletePatientById = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Patient not found',
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Patient deleted successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Internal Server error',
    });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatientById,
  deletePatientById,
};
