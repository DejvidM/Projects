const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.Register = async (req ,res ) => {

    const user = await User.findOne({email : req.body.email})
    if(user == true)
    {
        return res.status(400).json({errors : { email : {message : 'Email is taken'}}})
    }
    else 
    {
        User.create(req.body)
            .then(user => {
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);

                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "Success!", user : user });
            })
            .catch(err => res.status(400).json(err));
    }   
}

module.exports.Login = async (req, res) => {

    const user = await User.findOne({ email: req.body.email });

    if(user === null) {
        return res.status(400).json('Email does not exist');
    }
    
    const correctPassword = await bcrypt.compare( req.body.password , user.password);

    if(!correctPassword) {
        return res.status(400).json('Incorrect Password');
    } 
    
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "Success! . You are logged in" });
}

module.exports.Logout = (req ,res ) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.getAll = (req ,res ) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
}
module.exports.getOne =  (req ,res ) => {
    User.findOne({email : req.params.email} )
        .then(users => res.json(users))
        .catch(err => res.json(err))
}
