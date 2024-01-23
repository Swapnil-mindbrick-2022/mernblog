import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div  className='min-h-screen mt-20'>
      <div  className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left side */}
        <div className="flex-1">
        <Link to='/' className='font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              Swapnil
            </span>
            Blog
          </Link>

          <p className="text-sm mt-5 ">
            this is the demo project , you can sign up with ur email and
            password or with google
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
        <form  className="flex flex-col gap-4">
          <div>
            <Label  value="Your username "></Label>
            <TextInput 
            
            type='text' placeholder="UserName" id="username"/>
          </div>
          <div>
            <Label  value="Your Email "></Label>
            <TextInput 
            
            type='text' placeholder="Email" id="email"/>
          </div>
          <div>
            <Label  value="Your username "></Label>
            <TextInput 
            
            type='text' placeholder="Password" id="passwprd"/>
          </div>
        <Button gradientDuoTone='purpleToPink' type='submit' pill> SIGNUP</Button>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have An account? </span>
          <Link to ='/signin' className="text-blue-500">SignIn</Link>
        </div>
        
        </div>
      </div>
    </div>
  )
}

export default Signup