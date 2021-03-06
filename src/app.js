const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const {Auth} = require('./api/middlewares/auth');


const passport =require('passport');





//importar rutas 

const indexRoutes = require('./routes/index');
const userRouter = require('./routes/users');
const adminRouter = require('./routes/admin')
const app = express();
require('./config/passport');

//api import routes
const partRouterApi = require('./api/routes/partRoutes');
const userRouterApi = require('./api/routes/userRoutes');
const taskRouterApi = require('./api/routes/taskRoutes')


//var mongoDB = 'mongodb://localhost:27017/prueba'
var mongoDB = process.env.MONGO_URI;
mongoose.Promise = global.Promise
mongoose.connect(mongoDB, { useNewUrlParser : true})
 .then(() =>{
     console.log("conexion realizada a la base de datos.")
 })
.catch(err => console.log(err))



//config de puertos, motor de render(ejs)
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretuser',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//middlewares (JSON) - 

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}) )


//Routes

app.use('/', indexRoutes);
app.use(userRouter);
app.use(adminRouter);

//Static
app.use(express.static(path.join(__dirname, 'public')))

//api
app.use('/api', userRouterApi); 
app.use('/api',Auth, partRouterApi);
app.use('/api',Auth, taskRouterApi);


//Servidor

app.listen(app.get('port'), () =>{
    console.log("conectado al puerto 3000")
})