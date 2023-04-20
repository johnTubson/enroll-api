require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { urlencoded, json } = require("body-parser");
const User = require("./enrollDB");
const verify = require("./email-validation");
const uniqid = require("uniqid");
const port = process.env.PORT || 3001;


const app = express();
app.set("view engine", "ejs");
app.use(urlencoded({extended:true}));
app.use(express.static("public"));



mongoose.connect("mongodb+srv://"+process.env.mongoUsername+":"+process.env.mongoPassword+"@cluster0.1riedus.mongodb.net/?retryWrites=true&w=majority/enrollDB").then(()=> {
    app.listen(port, () => console.log("Server successfully running on port " +port ));
}).catch((err) => {
    console.log("Check Database connection" + err);
});


app.route("/enroll")
    .get((req, res) => {
        res.render("enroll");

    })
    .post((req, res) => {
        const token = uniqid();
        const newUser = {
            fName: req.body.fName,
            lName: req.body.lName,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            gender: req.body.gender,
            country: req.body.country,
            choiceOne: req.body.choiceOne,
            choiceTwo: req.body.choiceTwo,
            preferredCity: req.body.preferredCity,
            fullSponsorship: req.body.fullSponsorship,
            marketingConsent: req.body.marketingConsent,
            active: false,
            token: token,
        };
        const saveUser = new User(newUser);
    
        saveUser.save()
        .then(() => verify(newUser.email, newUser.fName, token)
             .then(res.send("Activation link sent, check email inbox to confirm email."))
             .catch(err => res.send("Error sending activation mail")))
        .catch(err => {
            res.send({error: "Error saving the new user"})
        });
    })
app.route("/verify")
    .get((req,res) => {
        const userToken = req.params.token;
        User.updateOne({token: userToken}, {active: true}).then(() => res.send("Account successfully verified"))
        .catch((err)=> res.send("Error confirming account, try again later"))
    })
app.route("/users")
   .get((req, res) => {
    // get all enrolled users
    User.find({active: true}).then(foundUsers=> {
        res.send(foundUsers);
    })
   })
   .delete((req,res) => {
    //delete all enrolled users
    User.deleteMany({active:true}).then(() =>
    res.send({Msg: "All users successfully deleted"}));
   });




app.route("/users/:id")
   .get((req, res) => {
    // get a particular user id
    User.findOne({_id: req.params.id}).then((user)=> {
        if(user) {
            res.send(JSON.stringify(user))
        }
        else {
            res.send("User doesn't exist")
        }
    }).catch((err)=> {
        res.send("err retrieving user")
    })
   })
   .patch((req, res) => {
    // update a particular user details
    const updatedDetails = req.body
    User.updateOne({_id:req.params.id}, {updatedDetails}).then(()=> res.send("User successfully updated"))
    .catch((err) => res.send("Error updating user details"))
   })
   .delete((req, res) => {
    // delete a particular user details
    User.deleteOne({_id:req.params.id}).then(() => res.send("User successfully deleted"))
    .catch((err) => res.send("Error deleting user"))
   })






app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    res.json({Err: "Endpoint not defined"});
})

