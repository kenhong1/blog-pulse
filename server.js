const express = require("express");
const db = require("./models");
const ejsLayouts = require("express-ejs-layouts"); 
const app = express(); 


app.use(express.static("static")); 
app.set("view engine", "ejs"); 
app.use(express.urlencoded({extended: false}))
app.use(ejsLayouts); 


// rending all of the posts of authors to the homepage of main/index 
app.get("/", function(req, res){
    db.post.findAll({
        include: [db.author]
    }).then(function(posts){
        res.render("main/index", {posts})
    });
});



app.use("/authors", require("./routes/authors")); 
app.use("/posts", require("./routes/posts")); 

app.listen(3000, function(){
    console.log("3000")
}); 