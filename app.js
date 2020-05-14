var express        =      require("express"),
    app            =      express(),
    bodyParser     =      require("body-parser"),
    mongoose       =      require("mongoose"),
    methodOverride =      require("method-override"),
	LocalStrategy  =      require("passport-local"),
	passport       =      require("passport"),
    Campground     =      require("./models/campground"),
	Comment        =      require("./models/comments"),
	User           =      require("./models/user")
    seedDB         =      require("./seeds");


var commentRoutes  =      require("./routes/comment"),
	mainRoutes     =      require("./routes/main"),
	indexRoutes    =      require("./routes/index")
    


//Seed DataBase

//seedDB();

app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/yelp_camp_v9",{useNewUrlParser: true,useUnifiedTopology:true});

app.set("view engine","ejs");

app.use (bodyParser.urlencoded({extended:true}));

//passport config 

app.use(require("express-session")({
	secret:"waiting for cyber punk 2077",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize());

app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());

passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
})
app.use(commentRoutes);
app.use(mainRoutes);
app.use(indexRoutes);



app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("server started");
});