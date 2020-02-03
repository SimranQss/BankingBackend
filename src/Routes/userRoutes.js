var UserController = require('../Controller/userController');
var auth = require('../Module/auth.js')

exports.getRouter = (app) => {
 
    app.route('/user/login').post(UserController.login)
    
    app.route('/user/userById').get(auth.requiresLoginUser,UserController.userById)

    app.route('/user/transaction').post(auth.requiresLoginUser,UserController.transaction)

    app.route('/user/transactionhistory').get(auth.requiresLoginUser,UserController.transactionHistory)

    return app;
}