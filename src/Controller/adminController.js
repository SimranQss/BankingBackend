const { AdminModel } = require('../Model/adminModel')
const status = require('../Module/status')
const Joi = require('joi')
const md5 = require('md5')
const responses = require('../Module/response.js')
var randomize = require('randomatic');
const { UserModel } = require('../Model/userModel')


/*=========================================
+++++++++++++++++Common Login++++++++++++++
=========================================*/

exports.commonLogin = async(req, res) => {
    try{
        const schema = Joi.object().keys({
            emailId: Joi.string().email({ minDomainAtoms: 2 }).required().error(e => 'Email is\'nt in correct format.'),
            password: Joi.string().required()
        })
        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
            } else {
                res.status(status.BAD_REQUEST).json({ message: result.error.message });
            }
            return;
        }
        var { emailId, password} = req.body;
        var adminData = await AdminModel.findOne({ emailId })
                if (adminData) {
                    if (adminData.get('password') == md5(password)) {
                        var access_token = md5(new Date());
                        var updateData = { access_token};
                        var adminResult = await AdminModel.findByIdAndUpdate(adminData.get('_id'), { $set: updateData }, { new: true })
                            if(adminResult){
                                res.status(status.SUCCESS_STATUS).json({ message: " Login successfully.", response: adminResult,
                            isAdmin : true })
                            }
                    } else {
                        res.status(status.INVALID_CREDENTIAL).json({ message: 'password is incorrect' });
                    }
                } else {
                    var userData = await UserModel.findOne({ emailId })
                    if (userData) {
                        if (userData.get('password') == md5(password)) {
                            var access_token = md5(new Date());
                            var updateData = { access_token};
                            var UserResult = await UserModel.findByIdAndUpdate(userData.get('_id'), { $set: updateData }, { new: true })
                                if(UserResult){
                                    res.status(status.SUCCESS_STATUS).json({ message: " Login successfully.", response: UserResult,isAdmin : false  })
                                }
                        } else {
                            res.status(status.INVALID_CREDENTIAL).json({ message: 'password is incorrect' });
                        }
                    } else {
                        res.status(status.INVALID_CREDENTIAL).json({ message: 'This email is not registered with us' });
                    }
                }
            
    }catch(err){
            responses.sendError(err.message, res)

    }
    
}




                                /*=========================================
                                +++++++++++++++++Admin Login++++++++++++++
                                =========================================*/

exports.login = async(req, res) => {
    try{
        const schema = Joi.object().keys({
            emailId: Joi.string().email({ minDomainAtoms: 2 }).required().error(e => 'Email is\'nt in correct formet.'),
            password: Joi.string().required()
        })
        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
            } else {
                res.status(status.BAD_REQUEST).json({ message: result.error.message });
            }
            return;
        }
        var { emailId, password} = req.body;
        var adminData = await AdminModel.findOne({ emailId })
                if (adminData) {
                    if (adminData.get('password') == md5(password)) {
                        var access_token = md5(new Date());
                        var updateData = { access_token};
                        var adminResult = await AdminModel.findByIdAndUpdate(adminData.get('_id'), { $set: updateData }, { new: true })
                            if(adminResult){
                                res.status(status.SUCCESS_STATUS).json({ message: " Login successfully.", response: adminResult })
                            }
                    } else {
                        res.status(status.INVALID_CREDENTIAL).json({ message: 'password is incorrect' });
                    }
                } else {
                    res.status(status.INVALID_CREDENTIAL).json({ message: 'This email is not registered with us' });
                }
            
    }catch(err){
         responses.sendError(err.message, res)

    }
    
}


                                /*=========================================
                                +++++++++++++++++Admin Update++++++++++++++
                                =========================================*/


exports.adminUpdate = async(req,res) => {
    try{
        const schema = Joi.object().keys({
            mobileNumber: Joi.string().optional().error(e => 'Mobile number required.'),
            name: Joi.string().error(e => 'Name is required'),
            location: Joi.string().required(),
            about_me: Joi.string()
        })
        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
            } else {
                res.status(status.BAD_REQUEST).json({ message: result.error.message });
            }
            return;
        }
    
        // Check existing data 
        var { access_token } = req.headers
        var { mobileNumber, name, about_me, location } = req.body;
        var adminResult = await AdminModel.findOne({ access_token })
            if(adminResult){
                    // if (req.files.length > 0) {
                    //     var profile_image = `/${req.files[0].path}`;
                    // }
                    var modified_on = new Date().getTime();
                    var updateData = { mobileNumber, name, modified_on, about_me, location };
                    var adminUpdate = await AdminModel.findByIdAndUpdate(adminResult._id, { $set: updateData }, { new: true })
                        if(adminUpdate){
                            res.status(status.SUCCESS_STATUS).json({ message: "Profile Updated Successfully", response: adminUpdate })
                        }else{
                            res.status(status.INVALID_CREDENTIAL).json({ message: "Profile is not upadated " })
                        }
                } else {
                    res.status(status.BAD_REQUEST).json({ message: "Access Token is not exists " })
                }
            }catch(err){
                responses.sendError(err.message, res)

            }
    }
   
                                        /*=========================================
                                        +++++++++++++++Create Account++++++++++++++
                                        =========================================*/


exports.createAccount = async(req,res) => {
    try{
        const schema = Joi.object().keys({
            firstName: Joi.string().optional(),
            lastName: Joi.string(),
            age: Joi.number().required(),
            religion: Joi.string().required(),
            mobileNumber: Joi.number().required(),
            accountType: Joi.number().required(),
            adharCardNumber: Joi.number().required(),
            panCardNo: Joi.string().required(),
            balance : Joi.number().required(),
            emailId : Joi.string().required()
        })
        const result = Joi.validate(req.body, schema, { abortEarly: true });
        if (result.error) {
            if (result.error.details && result.error.details[0].message) {
                res.status(status.BAD_REQUEST).json({ message: result.error.details[0].message });
            } else {
                res.status(status.BAD_REQUEST).json({ message: result.error.message });
            }
            return;
        }
        var {firstName,lastName,age,religion,balance,mobileNumber,accountType,adharCardNumber,panCardNo,emailId} = req.body
        var emailCheck = await UserModel.findOne({emailId})
        if(emailCheck){
            throw new Error('Email is already registered with us')
           
        }
        var password = "123456789" 
        // var password  =  randomize('aA0', 8)
        var accountNo = randomize('0',16)
        password = md5(password)
        var access_token = md5(new Date())
        var saveData = {password,firstName,accountNo,access_token,balance,lastName,age,religion,mobileNumber,accountType,adharCardNumber,panCardNo,emailId}
        var data = new UserModel(saveData)
        var userData = await data.save(saveData)
        if(userData){
            res.status(status.SUCCESS_STATUS).json({ message: 'User Account Created', response: userData })
        }else{
            res.status(status.SUCCESS_STATUS).json({ message: 'Unable to create user account' })
        }
            }catch(err){
             responses.sendError(err.message, res)

            }
    }


                                /*=========================================
                                +++++++++++++++Get all user++++++++++++++
                                =========================================*/

exports.getAllUser = async(req,res) => {
    try{
        var allUser = await UserModel.find()
        if(allUser){
            res.status(status.SUCCESS_STATUS).json({message : 'All Users',response : allUser})
        }else{
            res.status(status.INVALID_CREDENTIAL).json({message : 'No User found'})
        }
        }catch(err){
                 responses.sendError(err.message, res)
        }
    }



                                /*=========================================
                                ++++++++++++++Get User By Id++++++++++++++
                                =========================================*/



exports.userById = async (req, res) => {
    try {
        var {_id} = req.body
        var data = await UserModel.findOne({_id})
        if (data) {
            res.status(200).json({ message: "Data found" ,response : data})
        } else {
            res.status(400).json({ message: "User not found" })
        }
    } catch (err) {
        err => { console.log(err).sendError(err.message, res) }
    }
}

                                    /*=========================================
                                    +++++++++++++++++User Delete++++++++++++++
                                    =========================================*/


exports.deleteUser = async (req, res) => {
    try {
        var { _id } = req.body
        //_id = id
        console.log(_id)
        var data = await UserModel.findByIdAndRemove(_id)
        if (data) {
            console.log(data)
            res.status(200).json({ message: "Deleted Successfuly" })
        } else {
            res.status(400).json({ message: "Invalid Id" })
        }
    } catch (error) {
        err => { console.log(err).sendError(err.message, res) }
    }
}


                                    /*=========================================
                                    +++++++++++++++++User Update++++++++++++++
                                    =========================================*/

exports.updateDetails = async(req, res) => {
    try{
        var {_id} = req.body
            var singleUserDataUpdate = await UserModel.findByIdAndUpdate(_id,{$set : req.body},{new: true})
            if(singleUserDataUpdate){
                res.status(status.SUCCESS_STATUS).json({message : "All details Updated",response : singleUserDataUpdate})
            }else{
                res.status(status.INVALID_CREDENTIAL).json({message : "Details not updated"})
            }
    }catch(err){
        (err => responses.sendError(err.message, res))
    }
}