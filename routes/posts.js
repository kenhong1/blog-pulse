const express = require("express");
const db = require("../models");
const router = express.Router(); 

// POST / posts - create a new post 
router.post("/", function(req, res){
    db.post.create({
        title: req.body.title,
        content: req.body.content, 
        authorId: req.body.authorId 
    }).then(function(post){
        res.redirect("/"); 
    }).catch(function(error){
        res.status(500).render("main/404")
    }); 
});


// GET / posts/ new - sends the form for a new post 
// find all authors so you can make a post too. 
router.get("/new", function(req, res){
    db.author.findAll()
    .then(function(authors){
        res.render("posts/new", {authors})
    })
    .catch(function(error){
        res.status(500).render("main/404")
    });
}); 



// comment 
  //using req.params becuase becuase of finding ID in URL
router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  db.post
    .findOne({
      where:{ id },
      include: [db.author, db.comment]
      //comments that are related to the author 
    })
    .then(post => {
      if (!post) throw Error();
      console.log(post); 
      res.render("posts/show", {post});
    })
  
})

  
//id of your comment 
  // using req.body becuase key value in DB match 
router.post("/:id", (req, res) => {
  let id = parseInt(req.params.id); 
    db.comment
    .create({
      name: req.body.name,
      content:req.body.content,
      postId: req.body.postId
    })
    .then(() => {
      res.redirect(`/posts/${id}`)
    })
})




module.exports = router; 