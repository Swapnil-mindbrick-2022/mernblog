import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRoute  from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js'
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Mongodb connected ")
});


const app = express();
app.use(express.json());
app.use(cookieParser()); // Place cookie parser middleware here



app.use('/api/user',userRoute )
app.use('/api/auth',authRoute )


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error "

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

app.listen(3000,()=>{
    console.log("server is running at port 3000 !!!")
})



app.get('/test', (req,res)=>{
  
})