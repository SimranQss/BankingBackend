const { conn, mongoose } = require('../Services/mongoose.js')

let adminSchema = mongoose.Schema({

    emailId : {
        type : String
    },
    location : {
        type : String
    },
    mobileNumber : {
        type : String
    },
    modified_on : {
        type : String
    },
    password : {
        type : String
    },
    about_me : {
        type : String
    },
    access_token : {
        type : String
    },
    name : {
        type : String
    },
    address : {
        type : String
    }
    

}, {
        strict: true,
        versionKey: false,
        collection: 'Admin'
    })
exports.AdminModel = conn.model('Admin', adminSchema) 