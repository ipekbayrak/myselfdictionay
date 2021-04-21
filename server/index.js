const express=require('express');
const mongoose= require('mongoose');
const bodyparser=require('body-parser');
const cookieParser=require('cookie-parser');
const db=require('./config/config').get(process.env.NODE_ENV);

const User=require('./models/user');
const {auth} = require('./middleware/auth');

var cors = require('cors');

const app=express();
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

app.use(function(req, res, next){  
   res.header('Access-Control-Allow-Methods',
   'GET,PUT,POST,DELETE,OPTIONS');  
   res.header('Access-Control-Allow-Headers',
   'Access-Control-Allow-Origin,*');  
   res.header('Access-Control-Allow-Credentials', true);  
   res.header('Access-Control-Allow-Origin',
   '*');
if (req.method === 'OPTIONS') {
    res.status(200);
} next(); })  

// database connection
mongoose.Promise=global.Promise;
mongoose.connect(db.CONNECTION_STRING,{ useNewUrlParser: true,useUnifiedTopology:true },function(err){
    if(err) console.log(err);
    console.log("database is connected");
});

app.get('/',function(req,res){
    res.status(200).send(`Welcome to login , sign-up api`);
});

// listening port
const PORT=process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`app is live at ${PORT}`);
});

// adding new user (sign-up route)
app.post('/api/register',function(req,res){
   // taking a user
   const newuser=new User(req.body);
   
  if(newuser.password!=newuser.password2)return res.status(400).json({message: "password not match"});
   
   User.findOne({email:newuser.email},function(err,user){
       if(user) return res.status(400).json({ auth : false, message :"email exits"});

       newuser.save((err,doc)=>{
           if(err) {console.log(err);
               return res.status(400).json({ success : false});}
           res.status(200).json({
               succes:true,
               user : doc
           });
       });
   });
});

app.post('/api/login', function(req,res){
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id
                        ,email : user.email
                    });
                });    
            });
          });
        }
    });
});

app.get('/api/profile',auth,function(req,res){
        res.json({
            isAuth: true,
            id: req.user._id,
            email: req.user.email,
            name: req.user.firstname + req.user.lastname
            
        })
});

app.get('/api/logout',auth,function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
            res.sendStatus(200);
    });
}); 