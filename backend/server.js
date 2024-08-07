require('dotenv').config()

const express = require('express')

const mongoose=require('mongoose')
const multer = require('multer')
const upload = multer({dest:'images/'})
const productsRoutes= require('./routes/products')
const rentalRoutes= require('./routes/rental')
const categoryRoutes= require('./routes/category')
const registerRoutes= require('./routes/register')
const storeRoutes= require('./routes/store')
const storerentalRoutes= require('./routes/storerental')
const cartRoutes= require('./routes/cart')
const orderRoutes= require('./routes/order')
const Booking= require('./routes/booking')
const Stripepayment= require('./routes/stripe_payment')
const profileRoute= require('./routes/profile')
const twiliosms= require('./routes/twilio')
const disease= require('./routes/disease')





//  express app
const app = express()


//middleware
app.use(express.json())   // check for data for json requests

app.use((req, res, next) =>{
    console.log(req.path,req.method);
    next();
});
 

//routes
app.use('/images',express.static('images'))

app.use('/api/products',upload.single('image'),productsRoutes)
app.use('/api/rental',upload.single('image'),rentalRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/register',registerRoutes)
app.use('/api/store',storeRoutes)
app.use('/api/storerental',storerentalRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/order',orderRoutes)
app.use('/api/booking',Booking)
app.use('/api/stripe_payment',Stripepayment)
app.use('/api/profile',profileRoute)
app.use('/api/send-sms',twiliosms)
app.use('/api/disease',disease)





//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for request after connection is established with the database
        app.listen(process.env.PORT,()=>{
        console.log('Connect to DB & Server is running on port 4000!');
        })
    })
    .catch((err)=>{
        console.log(err)
    });



