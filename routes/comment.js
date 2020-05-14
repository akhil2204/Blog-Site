var express        =      require("express");
var router         =      express.Router(),
	authenticate   =      require("../authentication/index");



var Campground     =      require("../models/campground"),
	Comment        =      require("../models/comments");


router.get("/destination/:id/comments/new",authenticate.isLoggedIn,function(req,res){
Campground.findById(req.params.id,function(err,comment){
	if(err){
	   res.redirect("/");
	   }
	else{
	res.render("comments/new",{comment:comment});}
})
});

router.post("/destination/:id/comments/",authenticate.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,submit){
	if(err){
	   res.redirect("/");
	   }
	else{
	Comment.create(req.body.comm,function(err,comment){
	if(err){
		console.log(err);
	}
		else{
			// addd user name and send
			comment.author.id        =   req.user._id;
			comment.author.username  =   req.user.username;
			comment.save();
			
			//save comment
			submit.comments.push(comment);
			submit.save();
			res.redirect("/destination/"+submit._id)
		}
      })
	
	}
		
});
});


	router.get("/destination/:id/comments/:comment_id/edit",authenticate.CheckCommentOwner ,authenticate.isLoggedIn, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
      }
   });
});


router.put("/destination/:id/comments/:comment_id", authenticate.CheckCommentOwner,authenticate.isLoggedIn, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/destination/" + req.params.id );
      }
   });
})

	router.delete("/destination/:id/comments/:comment_id",authenticate.CheckCommentOwner ,authenticate.isLoggedIn, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/destination/" + req.params.id );
      }
   });
})




module.exports=router;


