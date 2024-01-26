import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import {useNavigate} from 'react-router-dom'
import { useDispatch , useSelector } from "react-redux";
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice.js'
import Oauth from "../component/Oauth";

const Signin = () => {
  const [formData, setFormData]= useState({});

  const {loading, error:errorMessage} = useSelector(state=>state.user);
  // const [errorMessage, setErrorMessage] = useState(null);
  // const [loading , setLoading] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const HandleChange= (e)=>{

    setFormData({...formData , [e.target.id]:e.target.value})




    // console.log(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password ){
     return dispatch(signInFailure('Please fill all tge field '))
    }
    try {
      // setLoading(true);
      // setErrorMessage(null)
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      
      
  
      const data =await res.json();

      if(data.success === false){
        // return setErrorMessage(data.message)

        dispatch(signInFailure(data.message))
      }
      

      if (res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
      // setLoading(false);
    }
  };
  
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
        <form  className="flex flex-col gap-4" onSubmit={handleSubmit}>
         
          <div>
            <Label  value="Your Email "></Label>
            <TextInput 
            
            type='email' placeholder="Email" id="email" onChange={HandleChange}/>
          </div>
          <div>
            <Label  value="Your username "></Label>
            <TextInput 
            
            type='password' placeholder="***********" id="password" onChange={HandleChange}/>
          </div>
        <Button gradientDuoTone='purpleToPink' type='submit' disabled ={loading} pill > 
        
        {
          loading ? (
            <>
            <Spinner  size='sm'/>
            <span className="pl-3 ">loading....</span>
            </>
          ):"Sign In"
        }


        </Button>

        <Oauth/>
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have An account? </span>
          <Link to ='/signup' className="text-blue-500">SignUp</Link>


        </div>
          {
            errorMessage && (
              <Alert  className="mt-5 " color ='failure'>{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Signin;