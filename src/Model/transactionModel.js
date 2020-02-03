const { conn, mongoose } = require('../Services/mongoose.js')

let transactionSchema = mongoose.Schema({

    amount : {
        type : Number
    },
    isCredit : {
        type : Number
    },
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance : {
        type : Number
    }

}, {
        strict: true,
        versionKey: false,
        collection: 'Transaction'
    })
exports.TransactionModel = conn.model('Transaction', transactionSchema) 