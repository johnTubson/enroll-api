require("dotenv").config();
const express = require("express");
const { urlencoded, json } = require("body-parser");
const port = process.env.PORT || 3000;
const dbConnection = require("./controllers/database-connection");
const routes = require("./routes/routes");


const app = express();
app.set("view engine", "ejs");
app.use(urlencoded({extended:true}));
app.use(express.static("public"));



dbConnection.then(()=> {
    app.listen(port, () => console.log("Server successfully running on port " +port ));
}).catch((err) => {
    console.log("Check Database connection \n" + err);
});


app.use("/", routes);




app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    res.json({Err: "Endpoint not defined"});
})

