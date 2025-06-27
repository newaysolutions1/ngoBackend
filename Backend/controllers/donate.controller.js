// controllers/donate.controller.js
const Donate = require('../models/donate.model.js');
const { ERROR } = require('../constants.js');

// POST /api/donates
const createDonate = async (req, res) => {
  try {
    const { amount, name, email, phone } = req.body;

    const donate = await Donate.create({ amount, name, email, phone });

    return res.status(201).json({
      success: true,
      message: 'Donation recorded',
      data: donate,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ERROR,
      error: error.message,
    });
  }
};

// GET /api/donates
const getAllDonates = async (_req, res) => {
  try {
    const donates = await Donate.find()
      .select('name email phone amount status createdAt')
      .sort('-createdAt');

    return res.status(200).json({ success: true, data: donates });
  } catch (error) {
    return res.status(500).json({ success: false, message: ERROR, error: error.message });
  }
};

// GET /api/donates/:id
const getDonateById = async (req, res) => {
  try {
    const donate = await Donate.findById(req.params.id);
    if (!donate) return res.status(404).json({ success: false, message: 'Donation not found' });

    return res.status(200).json({ success: true, data: donate });
  } catch (error) {
    return res.status(500).json({ success: false, message: ERROR, error: error.message });
  }
};

// PATCH /api/donates/:id/status
const updateDonateStatusById = async (req, res) => {
  try {
    const donate = await Donate.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!donate) return res.status(404).json({ success: false, message: 'Donation not found' });

    return res.status(200).json({ success: true, message: 'Status updated', data: donate });
  } catch (error) {
    return res.status(500).json({ success: false, message: ERROR, error: error.message });
  }
};

// DELETE /api/donates/:id
const deleteDonateById = async (req, res) => {
  try {
    const removed = await Donate.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: 'Donation not found' });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ success: false, message: ERROR, error: error.message });
  }
};

module.exports = {
  createDonate,
  getAllDonates,
  getDonateById,
  updateDonateStatusById,
  deleteDonateById,
};
