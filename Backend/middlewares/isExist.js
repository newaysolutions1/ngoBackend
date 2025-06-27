const Student = require('../models/student.model.js');

async function isExist(req, res, next){

    const available = await Student.findOne({email: req.body.email, phone: req.body.phone});

    if(available){
        return res.status(400).json({status: 400, success: false, message: 'Already Exist'});
    }

    next()
}

module.exports = isExist;