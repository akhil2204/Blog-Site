
var authenticate   =       {},
	Campground     =      require("../models/campground"),
	Comment        =      require("../models/comments");

 authenticate.checkmainkOwner = function(req,res,next){

if(req.isAuthenticated()){
Campground.findById(req.params.id,function(err,edit){
	if(err){
	   res.redirect("back");
	   }
	else{
		if(edit.author.id.equals(req.user._id)){
	        next();}
		else{
			res.redirect("back")
		}
	}
})	
}
	else{
		res.redirect("back")
	}
}

 
 authenticate.isLoggedIn=function (req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}
 
 
 
authenticate.CheckCommentOwner=function (req,res,next){
	
if(req.isAuthenticated()){
Comment.findById(req.params.comment_id,function(err,edit){
	if(err){
	   res.redirect("back");
	   }
	else{
		if(edit.author.id.equals(req.user._id)){
	        next();}
		else{
			res.redirect("back")
		}
	}
})	
}
	else{
		res.redirect("back")
	}
}


module.exports = authenticate;

