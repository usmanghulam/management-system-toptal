const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const signUpSchema = require('../mongodb/schema/signup');

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    signUpSchema.findOne({ email })
    .then(user => {
        if (user) return res.json({ message: {
            type: "error",
            text: "User already Exist",
        }});
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err) return res.status(400).json({ message: {...err, type: 'error'} });
      
              let signupUser = {
                  ...req.body,
              }
              signupUser.password = hash;
      
              const newuser = new signUpSchema(signupUser);
              newuser
                .save()
                .then((responce)=> {
                    jwt.sign({ ...responce._doc }, "secret", {},
                        (err, token)=> {
                            if(err) return console.log("Error In Token")
                            res.json({
                                data: {
                                    ...responce._doc,
                                    jwtToken: `Bearer ${token}`
                                },
                                message: {
                                    type: "success",
                                    text: "User create successfully"
                                }
                            })
                        }
                    )
                })
                .catch(err => res.json({message: {type: "error", text:"something went wrong"}}));
            });
        });
    })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return;
    signUpSchema.findOne({ email })
    .then(user => {
        try {
            if(!user) return res.json({errors: { email: "Email not Exist"}})
            bcrypt.compare(password,user.password,function(err,match){
                if(!match) return res.json({errors: { password: "Password doesn't match"}});

                jwt.sign({...user._doc}, "secret", {},
                    (err, token)=> {
                        if(err) return console.log("Error In Token")
                        res.json({
                            data: {
                                ...user._doc,
                                jwtToken: `Bearer ${token}`
                            },
                            message: {
                                type: "success",
                                text: "Login successfully"
                            }
                        })
                    }
                );
            })
        } catch (error) {
            res.json({ err: error })
        }
    })
});

router.get('/fetchUsers', (req, res) => {
    signUpSchema.find()
    .then(users => res.json({data: { users }}))
    .catch(err => res.json({ message: { type: 'error', text: "Something went wrong"}}));
})

module.exports = router;