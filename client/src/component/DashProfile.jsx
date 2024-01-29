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
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadingProcess, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);

  console.log(imageFileUploadingProcess, imageFileUploadingError);
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


      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };
  useEffect(() => {
    if (imageFile) {
      uplaodeImage();
    }
  }, [imageFile]);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl"> Profile</h1>

      <form className="flex flex-col gap-4">
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
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.rest.email}
        />
        <TextInput type="password" id="password" placeholder="password" />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline pill>
          {" "}
          update
        </Button>
      </form>

      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer"> Delete Account </span>
        <span className="cursor-pointer"> Sign Out </span>
      </div>
    </div>
  );
};

export default DashProfile;
