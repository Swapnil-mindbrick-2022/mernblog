import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";

import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {app} from '../firebase';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { signInSuccess } from "../redux/user/userSlice";
const Oauth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handlegoogleCliick = async()=>{
    
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'})

    try {
      const resultFromGoogle = await signInWithPopup(auth,provider);
      // console.log(resultFromGoogle)

      const res = await fetch('/api/auth/google',{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({
          name:resultFromGoogle.user.displayName,
          email:resultFromGoogle.user.email,
          googlePhotoUrl : resultFromGoogle.user.photoURL
        })
      })

      const data = await res.json();
    if(res.ok){
      dispatch(signInSuccess(data))
      navigate('/')
    }
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <Button  type='button' gradientDuoTone='pinkToOrange' outline pill onClick = {handlegoogleCliick}>
    <AiFillGoogleCircle  className="w-6 h-6 mr-2"/> Continue with Google
    </Button>
  )
}

export default Oauth;