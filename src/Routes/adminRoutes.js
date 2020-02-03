
var AdminController = require('../Controller/adminController.js');
var auth = require('../Module/auth.js')

exports.getRouter = (app) => {
 
    app.route('/login').post(AdminController.commonLogin) // common login

    app.route('/admin/login').post(AdminController.login)
    
    app.route('/admin/deleteuser').post(auth.requiresLogin,AdminController.deleteUser)

    app.route('/admin/adminupdate').post(auth.requiresLogin,AdminController.adminUpdate)

    app.route('/admin/createaccount').post(auth.requiresLogin,AdminController.createAccount)

    app.route('/admin/getalluser').get(auth.requiresLogin,AdminController.getAllUser)

    app.route('/admin/userById').post(auth.requiresLogin,AdminController.userById)

    app.route('/admin/updatedetails').post(auth.requiresLogin,AdminController.updateDetails)

    
    
    return app;
}