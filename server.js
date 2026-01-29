
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');
var cookieParser = require("cookie-parser");

var middlewares = require("./middlewares");

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));


app.get("/", (req, res) => {
    if (req.cookies.user) {
      res.redirect("/Home.html");
    } else {
      res.redirect("/login.html");
    }
  });
  
app.post("/login", middlewares.authenticate, (req, res) => {
    res.cookie("user", JSON.stringify({ 
        username: req.user.username, 
        password: req.user.password, 
    }));

    res.redirect("/");
});

app.get("/Todos",middlewares.authenticate,(req,res)=>{
    if(req.cookies.user){
        res.sendFile(__dirname + "/public/Todos.html");
    }
    else{
        res.redirect("/login.html");
    }
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");
  res.redirect("/login.html");
});

var PORT = 5000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
