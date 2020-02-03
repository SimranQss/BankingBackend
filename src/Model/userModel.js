const { conn, mongoose } = require('../Services/mongoose')

let userSchema = mongoose.Schema({

    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    access_token : {
        type : String
    },
    emailId : {
        type : String
    },
    createdOn : {
        type : String
    },
    balance : {
        type : Number,
        default : 0
    },
    accountNo : {
        type : Number
    },
    password : {
        type : String
    },
    age : {
        type : Number
    },
    religion : {
        type : String
    },
    mobileNumber : {
        type : Number
    },
    accountType : {
        type : Number,
        default : 0
    },
    adharCardNumber : {
        type : Number
    },
    panCardNo : {
        type : String
    },
    dob : {
        type : String
    },

}, {
        strict: true,
        versionKey: false,
        collection: 'User'
    })
exports.UserModel = conn.model('User', userSchema) 