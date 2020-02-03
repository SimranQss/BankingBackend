const { AdminModel } = require('../Model/adminModel')
const status = require('../Module/status')
const Joi = require('joi')
const md5 = require('md5')
const responses = require('../Module/response.js')
const { UserModel } = require('../Model/userModel')
const { TransactionModel } = require('../Model/transactionModel')



                                    /*=========================================
                                      +++++++++++++++++Login++++++++++++++
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
        var userData = await UserModel.findOne({ emailId })
                if (userData) {
                    if (userData.get('password') == md5(password)) {
                        var access_token = md5(new Date());
                        var updateData = { access_token};
                        var UserResult = await UserModel.findByIdAndUpdate(userData.get('_id'), { $set: updateData }, { new: true })
                            if(UserResult){
                                res.status(status.SUCCESS_STATUS).json({ message: " Login successfully.", response: UserResult })
                            }
                    } else {
                        res.status(status.INVALID_CREDENTIAL).json({ message: 'password is incorrect' });
                    }
                } else {
                    res.status(status.INVALID_CREDENTIAL).json({ message: 'This email is not registered with us' });
                }
            
    }catch(err){
        (err => responses.sendError(err.message, res))

    }
    
}

      /*=========================================
        ++++++++++++++Get User By Id++++++++++++++
      =========================================*/



  exports.userById = async (req, res) => {
         try {
             var access_token = req.user.access_token
            var data = await UserModel.findOne({access_token})
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
                                    +++++++++++++++++User Update++++++++++++++
                                    =========================================*/

exports.updateDetails = async(req, res) => {
    try{
            var singleUserDataUpdate = await UserModel.findByIdAndUpdate(req.user._id,{$set : req.body},{new: true})
            if(singleUserDataUpdate){
                res.status(status.SUCCESS_STATUS).json({message : "All details Updated",response : singleUserDataUpdate})
            }else{
                res.status(status.INVALID_CREDENTIAL).json({message : "Details not updated"})
            }
    }catch(err){
        (err => responses.sendError(err.message, res))
    }
}




                                    /*=========================================
                                    ++++++++Cash Withdrawl/Deposit++++++++++++
                                    =========================================*/

exports.transaction = async(req,res) =>{
    try{
        var {amount,isCredit} = req.body
    var amount = Number(amount)
        var access_token = req.user.access_token
        var userData = await UserModel.findOne({access_token})
        var user_id = userData._id
        if(userData){
            var balance = userData.balance 
            if(isCredit == 1){
                balance = balance + amount
            }else{
                if(balance <= 0 ||  balance < amount){
                    throw new Error('Insufficient Balance')
                }
                balance = balance - amount
            }
            var saveData = {user_id,amount,isCredit,balance}
            var trnsactionData = new TransactionModel(saveData)
            var data = await trnsactionData.save()
            if(data){
                var updateBalance = await UserModel.findByIdAndUpdate(req.user._id,{$set : {balance}},{new : true})
                if(updateBalance){
                    res.status(200).json({ message: "Your Transaction is Completed" ,response : data})
                }
            }else{
                res.status(400).json({ message: "We are unable to process your transaction" ,response : data})
            }
            
        }
        else{
            res.status(400).json({ message: "User not found" })
        }
    }catch(error){
        responses.sendError(error.message, res) 
    }
}


                                    /*=========================================
                                    ++++++++Transaction history++++++++++++
                                    =========================================*/
exports.transactionHistory = async (req, res) => {
    try {
        var _id = req.user._id
        // console.log(_id , "=====")
        var data = await TransactionModel.find({"user_id" : _id})
        if (data) {
            res.status(200).json({ message: "Data found" ,response : data})
        } else {
            res.status(400).json({ message: "User not found" })
        }
    } catch (err) {
        responses.sendError(err.message, res) 
    }
}