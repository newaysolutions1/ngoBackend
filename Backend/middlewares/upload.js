const multer = require('multer');
const path = require('path');

const uploadPath = path.join(__dirname, '../upload/students');

// Use Date.now() to avoid duplicate file names
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'video/mp4',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, image (jpeg/png), or mp4 files are allowed'), false);
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
