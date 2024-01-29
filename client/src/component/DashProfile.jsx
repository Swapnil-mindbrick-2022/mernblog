import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import  {updateStart,updateInSuccess,updateInFailure} from '../redux/user/userSlice.js';

import {useDispatch } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const {_id} = currentUser.rest;
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadingProcess, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
const [imageFileUploading ,setImageFileUplaoding]  = useState(null);
const [updateUserSuccess,setUpdateUserSuccess] = useState(null);
const [updateUserFailure,setUpdateUserFailure] = useState(null);
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({});
  // console.log(imageFileUploadingProcess, imageFileUploadingError);
  const HandleImageChange = (e) => {
    // setImageFile(e.target.files[0]);

    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  console.log(imageFile, imageFileUrl);
  //   console.log(currentUser)

  const uplaodeImage = async () => {
    // service firebase.storage {
    //     match /b/{bucket}/o {
    //       match /{allPaths=**} {
    //         allow read;
    //         allow write: if
    //         request.resource.size < 2 * 1024 * 1024  &&
    //         request.resource.contentType.matches('image/.*')
    //       }
    //     }
    //   }
    setImageFileUplaoding(true)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;

    const storageRdf = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRdf, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadingProgress(progress.toFixed(0));
      },
      () => {
        setImageFileUploadingError(
          "Could not upload images (file must mg 2 mb)"
        );
        setImageFileUploadingProgress(null)
        setImageFileUrl(null);
        setImageFile(null)
        setImageFileUplaoding(false)


      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({...formData, profilePicture:downloadURL});
          setImageFileUplaoding(false)
          
        });
      }
    );
  };
  useEffect(() => {
    if (imageFile) {
      uplaodeImage();
    }
  }, [imageFile]);


  const handleUpdateUer =(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value})
  }



  const HandleFormSubmit = async(e)=>{
    e.preventDefault();
    setUpdateUserFailure(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length ===0){
      setUpdateUserFailure('No changes made')
      return;
    }

    if(imageFileUploading){
      setUpdateUserFailure('place waiting for upload image')
      return;
    }
    try {
      dispatch(updateStart());

      const res = await fetch(`/api/user/update/${_id}`,{
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'

        },
        body: JSON.stringify(formData)
      })

      const data = await res.data;


      if(!res.ok){
        dispatch(updateInFailure(data.message))
        setUpdateUserFailure(data.message)
      }else{
        dispatch(updateInSuccess(data))
        setUpdateUserSuccess('update user successfully')
      }




      
    } catch (error) {
     dispatch(updateInFailure(error.message))
     setUpdateUserFailure(error.message)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl"> Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={HandleFormSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={HandleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full
        
        "
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadingProcess && (
            <CircularProgressbar
              value={imageFileUploadingProcess || 0}
              text={`${imageFileUploadingProcess}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path:{
                    stroke: `rgba(62,152,199, ${imageFileUploadingProcess/100})`,

                }
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.rest.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] *:
            ${imageFileUploadingProcess &&  imageFileUploadingProcess<100 && 'opacity-60'}
            `}
          />
        </div>

        {imageFileUploadingError && (
          <Alert color="failure">{imageFileUploadingError}</Alert>
        )}

        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.rest.username}
          onChange={handleUpdateUer}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.rest.email}
          onChange={handleUpdateUer}
        />
        <TextInput type="password" id="password" placeholder="password" onChange={handleUpdateUer} />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline pill>
          {" "}
          update
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer"> Delete Account </span>
        <span className="cursor-pointer"> Sign Out </span>
      </div>

      {
        updateUserSuccess && (<Alert color={'success'} className="mt-5">{updateUserSuccess}</Alert>)
      }


      {
        updateUserFailure &&  (<Alert color={'failure'} className="mt-5">{updateUserFailure}</Alert>)
      }
    </div>
  );
};

export default DashProfile;
