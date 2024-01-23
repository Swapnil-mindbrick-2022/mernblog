import express from 'express';
import dotenv from 'dotenv';

import mongoose from 'mongoose';
import userRoute  from './routes/user.routes.js';
import authRoute from './routes/auth.routes.js'
dotenv.config()
mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Mongodb connected ")
});


const app = express();
app.use(express.json())


app.use('/api/user',userRoute )
app.use('/api/user',authRoute )

app.listen(3000,()=>{
    console.log("server is running at port 3000 !!!")
})



app.get('/test', (req,res)=>{
  
})