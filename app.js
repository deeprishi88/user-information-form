const express = require("express");
const body_parser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(body_parser.json());
app.use(express.static("public"));
app.use(body_parser.urlencoded({
    extended:true
}))


// connecting mongodb database
mongoose.connect('mongodb://localhost:27017/user_info', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;


// check whether database is connected successfully or not
db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// sending data to database
app.post("/sign_up", (req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var phno = req.body.phno;
    var age = req.body.age;

    var data = {
        "name" : name,
        "email" : email,
        "phno": phno,
        "password" : age
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('data_received.html')

})

// homepage
app.get("/", (req,res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log(`Server running on port 3000`);