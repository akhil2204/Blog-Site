var express = require("express");
var router = express.Router();

var Campground     =      require("../models/campground"),
	Comment        =      require("../models/comments");

router.get("/",function(req,res){

	res.render("main/landing");
})



router.get("/destination/new",isLoggedIn,function(req,res){
	res.render("main/home");
	
	
});router.get("/destination/newgroup",isLoggedIn,function(req,res){
	res.render("main/group");
	
	
});

router.get("/destination",isLoggedIn,function(req,res){
	
Campground.find({},function(err,allCampgrounds){
	if(err){
		console.log(err);
	}
else{
res.render("main/result",{data:allCampgrounds});
}
});
});


router.post("/destination",isLoggedIn,function(req,res){
	
	

    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
var newData = {name:name, img: img, desc: desc, author:author}
	

Campground.create(newData,function(err,newlyCreated){
		if(err){
			console.log(err);
		}
		else{
			
			res.redirect("/destination");
		}
	});
	
});



router.get("/destination",isLoggedIn,function(req,res){
	
Campground.find({},function(err,data){
	if(err){
		console.log(err);
	}
else{

res.render("main/result",{data:data});
}
});
});

	

router.get("/destination/:id",isLoggedIn,function(req,res){
Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
	if(err){
		console.log(err);
	}
	else{
		res.render("main/byid",{byid:foundCampground});
	}
})
});
 

	

// router.get("/destination/:id",function(req,res){
// Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
// 	if(err){
// 		console.log(err);
// 	}
// 	else{
// 		console.log(foundCampground);
// 		res.render("main/byid",{byid:foundCampground});
// 	}
// })
// });
 

router.get("/destination/:id/edit",isLoggedIn,checkOwner,function(req,res){
	
Campground.findById(req.params.id,function(err,edit){
	
	res.render("main/edit",{edit:edit});
		})	
	});


router.put("/destination/:id",isLoggedIn,checkOwner,function(req,res){
Campground.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedBlog){
		if(err){
		res.redirect("/");
	}
		
	else{
	res.redirect("/destination/"+req.params.id);
		// res.render("main/result");
		}
	});
});



router.delete("/destination/:id",isLoggedIn,checkOwner,function(req,res){
	Campground.findByIdAndDelete(req.params.id,function(err){
		if(err){
		res.redirect("/destination");
	}
		
	else{
	res.redirect("/destination");}
	});
});



function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}




function checkOwner(req,res,next){

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

module.exports=router;
