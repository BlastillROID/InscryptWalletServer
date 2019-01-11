const User = require('./../models/User.model');
const UserSchema =require('./../models/User.model');


require('./../mongo').connect();


function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    UserSchema.statics.authenticate = function (email, password, callback) {
        User.findOne({
            email: email
        }).exec(function (err, user) {
            if (err) {
                return callback(err);
            } else if (!user) {
                var err = new Error('User not Found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            })

        });
    }
};

function register(req, res) {
    const originalUser = {


        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password

    };
    const user = new User(originalUser);
    var email = user.email;
    User.findOne({
        email: email
    }).exec(function (err, user) {
        if (err) {
            console.log("some error here !");
            return;
        } else if (user) {
            var err = new Error('Email Already in Use.');
            err.status = 401;
            err.body = {
                "Message": `The email ${user.email} is already in Use`
            };
            console.log("Email Used");
            res.status(500).send(err);
        } else {
            user.save(error => {
                if (checkServerError(res, error)) return;
                res.status(201).json(user);
                console.log('User Registered Successfully !');

            });
        }
    });



}


function checkServerError(res, error) {
    if (error) {
        console.log("Certain Problem here bro !")
        res.status(500).send(error);
    }
}



module.exports = {
    register,
    login
};