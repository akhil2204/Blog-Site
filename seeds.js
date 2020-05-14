var mongoose    = require("mongoose")

,   Campground  = require("./models/campground"),
	    Comment = require("./models/comments");

    data=[{
		
		name:"The Witcher 3: Wild Hunt",
		img:"https://cdn.mos.cms.futurecdn.net/x2J2Jb72sbKgtyqY22tokP-650-80.jpg.webp",
		desc:"Geralt isn’t perfect. His surroundings aren’t perfect either. War ravages most of the countryside, with bloodthirsty creatures who don’t even stick to the shadows anymore preying on innocent civilians, while others try to keep their identity secret in the human-dominated landscape. Yet that’s what makes The Witcher 3 the best open world game to play right now"
		
	},{
		
		name:"Red Dead Redemption 2",
		img:"https://cdn.mos.cms.futurecdn.net/D6Shw5jM4mWqEo4fQuo4XL-650-80.jpg.webp",
		desc:"Doesn’t matter if you want to hunt. Doesn’t matter if you want to try and help Dutch achieve his elusive goals, and it definitely doesn’t matter if you’d rather just try to own the fanciest rootin’ tootin’-ist wardrobe in all America: Red Dead Redemption 2 is absolutely packed full of activities to keep you busy as soon as you step foot in its world"
		
	},{
		
	name:"Horizon Zero Dawn",
		img:"https://cdn.mos.cms.futurecdn.net/iLiUte7ch5mCgPXFX5XjWU-650-80.jpg.webp",
		desc:"As well as being one of the best PS4 games around, Horizon: Zero Dawn is also one of the most original titles to come out since Bioshock. I’m not kidding. Taking place in a post-post apocalyptic world where tribes hunt robots in a lush overgrown landscape, you’re put in the shoes of Aloy, the razor-sharp outcast. Hunt robots sneakily or with your dizzying range of weapons as you uncover the mysterious past of the Old Ones, their ruins dotted through this massive open world game being sure to keep your interest at its highest peak"	
	
	}];
    

function seedDB(){
	Campground.remove({},function(err){
	// if(err){
	// 	console.log(err);
	// }	
	// 	else{
	// 		console.log("campg ground  Deleted");
			
	// 		data.forEach(function(seed){
	
	// 					Campground.create(seed,function(err,data){
	// 						if(err){
	// 							console.log(err);
	// 						}
	// 					else{
	// 							console.log("campground created");
							
	// 						Comment.create({text:"may best open world game in ps4 so war ",
	// 									   author:"akhil"},function(err,comment){
	// 										if(err){
	// 											console.log(err);
	// 										}
	// 							              else{
	// 							           	data.comments.push(comment)
	// 										data.save();
	// 										console.log("Created new Comment");}
								
	// 						})
							
	// 					}
	// 			});
	// 		});
	// 	}
	
	});
	}



module.exports=seedDB;					  