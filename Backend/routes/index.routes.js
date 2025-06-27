const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const authRoutes = require('./api/user.routes');
const studentRoutes = require('./api/student.routes');
const patientRoutes = require('./api/patient.routes');
const donateRoutes = require('./api/donate.routes')

router.use('/auth', authRoutes);
router.use('/students', studentRoutes);
router.use('/patients', patientRoutes);
router.use('/donates', donateRoutes);

router.get('/download', function (req, res) {
  try {
    const [folder, file] = req?.query?.filename?.split('/') || [];

    if (!folder || !file) {
      return res.status(400).send('Invalid filename format.');
    }

    const currentPath = path.join(__dirname);
    const dirPath = currentPath.split("routes")[0] + `upload/${folder}/${file}.pdf`;

    res.download(dirPath, 'ekzaria.pdf', (err) => {
      if (err) {
        console.error('Download error:', err);
        return res.status(500).send('File download failed.');
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
