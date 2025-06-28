const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, '../upload/students');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || 'application/jpeg' || 'application/jpg' || 'application/mp4') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = {
  upload,
  uploadMultiple: upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'identity', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
};
