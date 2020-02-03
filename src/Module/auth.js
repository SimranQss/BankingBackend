
const { AdminModel } = require('../Model/adminModel')
const { UserModel } = require('../Model/userModel')
const  responses = require('../Module/response')

exports.requiresLogin = async(req, res, next) => {
    console.log("auth");
    let { access_token } = req.headers;
    console.log(access_token)
    if (access_token) {
    var data = await AdminModel.findOne({ access_token })
            if(data){
                    req.admin = data;
                    next();
                console.log(access_token)
            }else{
                console.log("error")
                responses.authenticationErrorResponse(res);
            }
    } else {
        (responses.parameterMissingResponse(res));
        return;
    }
    }

exports.requiresLoginUser = async(req, res, next) => {
    console.log("auth");
    let { access_token } = req.headers;
    console.log(access_token)
    if (access_token) {
    var data = await UserModel.findOne({ access_token })
            if(data){
                    req.user = data;
                    next();
                console.log(access_token)
            }else{
                console.log("error")
                responses.authenticationErrorResponse(res);
            }
    } else {
        (responses.parameterMissingResponse(res));
        return;
    }
    }

