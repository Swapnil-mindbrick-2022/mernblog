import mongoose from 'mongoose';

const {Schema} = mongoose;


const userSchema = new Schema ({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:"https://res.cloudinary.com/dqv6g7t4"
    }
},{
    timestamps:true
})


const User = mongoose.model("User", userSchema);

export  default User;