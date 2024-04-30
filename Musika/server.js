const express = require('express');
const connectDB = require('./database/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const { adminAuth, userAuth } = require('./Middleware/auth.js')
const app = express();

const PORT = 3000;
//Middlewares
app.use(cors())
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", require('./Auth/Route'))
app.use('/api/adverts', express.static(path.join(__dirname, 'public/images')), require('./Routes/advertsRoutes.js'));
app.use('/api/admin', require('./Routes/adminRoutes.js'))
app.use('/api/user/', require('./Routes/userRoutes.js'))



//Connecting the database
connectDB();

// ************** //

app.set("view engine", "ejs")
app.get("/", (req, res) => res.render("Home1")) 
app.get("/signup", (req, res) => res.render("registerJ"))
app.get("/login", (req, res) => res.render("login"))
app.get('/admin', adminAuth, (req, res) => res.render("admin"));
app.get('/admin/pending', adminAuth, (req, res) => res.render('pending'))
app.get('/products', (req, res) => res.render("productsJ"));
app.get("/AdvertHub", (req, res) => res.render("AdvertHub"));
app.get('/adverts/upload', userAuth, (req, res) => res.render('uploadJ'))
app.get('/user/profile', userAuth, (req, res) => res.render('profile'))



  

//Starting the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
//Error handler for every unhandledRejection error
process.on('unhandledRejection', err => {
    console.log(`An error occurred: ${err.message}`);
    server.close(() => process.exit(1))
})