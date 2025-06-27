const express = require('express');
const router = express.Router();
const isExist = require('../../middlewares/isExist.js');


const {
  createDonate,
  getAllDonates,
  getDonateById,
  deleteDonateById,
  updateDonateStatusById
} = require('../../controllers/donate.controller.js');
const { uploadMultiple } = require('../../middlewares/upload.js');

router.post('/', uploadMultiple, isExist, createDonate);
router.get('/', getAllDonates);
router.get('/:id', getDonateById);
router.put('/status/:id', updateDonateStatusById);
router.delete('/:id', deleteDonateById);

module.exports = router;
