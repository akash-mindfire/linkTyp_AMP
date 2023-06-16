import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { SketchPicker } from "react-color";
import Loader from "../Loader";
function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}
export default function EditProfile({ getData }: any) {
  const token = Cookies.get("access_token");
  const [loader, setLoader] = useState(false);
  const [userData, setUserData] = useState();
  const [profileName, setProfileName] = useState('');
  const [profileBio, setProfileBio] = useState("");
  const [nameColor, setNameColor] = useState("#000000");
  const [bioColor, setBioColor] = useState("#000000");
  const [showNameColorPicker, setShowNameColorPicker] = useState(false);
  const [showBioColorPicker, setShowBioColorPicker] = useState(false);
  const [profileImage, setProfileImage] = useState();
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
      const response = await axios.get("https://api.linktyp.com/api/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data); if (response.data?.data[0]?.profile) {
        {
          response.data.data[0].profile.name!=""?
          setProfileName(response.data.data[0].profile.name):setProfileName("Your Name");
        }
        {
          response.data.data[0].profile.bio!=""?
          setProfileBio(response.data.data[0].profile.bio):setProfileBio("");
        }
      } setBioColor(response.data.data[0].profile.bioColor);
      setNameColor(response.data.data[0].profile.nameColor);
      setProfileImage(response.data.data[0].profile.avatar);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    }
  };
  console.log("userData", userData);
  const handleBioColorClick = () => {
    setShowBioColorPicker(!showBioColorPicker);
    setShowNameColorPicker(false);
  };
  const handleNameColorClick = () => {
    setShowNameColorPicker(!showNameColorPicker);
    setShowBioColorPicker(false);
  };
  const handleNameColorChange = (newColor: any) => {
    setNameColor(newColor.hex);
  };
  const handleBioColorChange = (newColor: any) => {
    setBioColor(newColor.hex);
  };
  const handleProfileImage = async (e: any) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setLoader(true);
      const formData = new FormData();
      formData.append("avatar", imageFile);
      try {
        // Upload the image file
        const response = await axios.post(
          "https://api.linktyp.com/api/profile/avatar",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          toast.success("Profile image updated successfully");
          getUserData();
          getData();
          document.dispatchEvent(new Event('refreshEvent'))
          // Update the profile data with the new image URL
          const updatedProfileData = { ...userData.data[0].profile, avatar: response.data.profile.avatar };
          setUserData({ ...userData, data: [{ ...userData.data[0], profile: updatedProfileData }] });
        } else {
          console.log(response.data.status);
        }
      } catch (error) {
        console.log(error);
        // toast.error("Failed to update profile image");
      } finally {
        setLoader(false);
      }
    }
  };
  const handleProfileUpdate = () => {
    if (!profileName) {
      // If either field is empty, don't add the card
      return toast.error("Please fill all the fields");
    }
    const profileData = {
      name: profileName,
      bio: profileBio,
      nameColor: nameColor,
      bioColor: bioColor,
    };
    axios
      .post("https://api.linktyp.com/api/profile", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Profile updated successfully");
        getUserData();
        getData();        
        setProfileName("");
        setProfileBio("");
        document.dispatchEvent(new Event("refreshEvent"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (!userData) {
    return (
      <Loader />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full rounded-2xl">
      <div className="w-full h-full md:w-full md:px-10">
        <div className="flex justify-center">
          <div className="avatar online">
            <div className="relative border-2 border-blue-500 rounded-full w-28">
              {loader && (
                <div
                  className="absolute profile-loader"
                  style={{ height: "100%", width: "100%" }}
                >
                  {LoadingSpinner()}
                </div>
              )}
              <img
                src={userData?.data[0]?.profile?.avatar || "/default.png"}
                alt={userData?.data[0]?.profile?.name}
                width={120}
                height={120}
                className="rounded-full"
              />
              <label htmlFor="profileImage" className="bg-blue-500 mask btn">
                Upload file
              </label>
              <input
                type="file"
                id="profileImage"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer upload_button"
                onChange={(e) => {
                  setLoader(true);
                  setProfileImage(e.target.files[0]);
                  handleProfileImage(e);
                  setInterval(function () {
                    setLoader(false);
                  }, 2000);
                }}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-10 mb-5">
{/* Profile Name */}
<div className="flex items-center justify-between w-full">
  <div className="relative w-full">
    <label htmlFor="profileName" className="absolute inset-y-0 flex items-center left-2 input-group">
      Profile Name:
    </label>
    <div className="relative">
      <input
        id="profileName"
        value={profileName}
        defaultValue={userData?.data[0]?.profile?.name}
        onChange={(e) => setProfileName(e.target.value)}
        type="text"
        className="w-full pl-6 border-gray-500 input input-bordered pr-14 input-lg"
      />
      <div className="absolute top-0 flex items-center h-full right-2">
        <label htmlFor="nameColorModal" className="w-12 px-2 py-1 text-white rounded-lg cursor-pointer mask btn btn-md" style={{ backgroundColor: nameColor }}>
        </label>
      </div>
      <input type="checkbox" id="nameColorModal" className="hidden modal-toggle" />
      <div className="modal">
        <div className="flex items-center justify-end w-64 bg-current modal-box p-7">
          <label htmlFor="nameColorModal" className="absolute btn btn-sm btn-square right-2 top-2">
            ✕
          </label>
          <SketchPicker color={nameColor} onChange={handleNameColorChange} />
        </div>
      </div>
    </div>
  </div>
</div>
{/* Profile Bio */}
<div className="flex items-center justify-between w-full mt-5 mb-5">
  <div className="relative w-full">
    <div className="relative">
      <input
      placeholder="You bio"
        value={profileBio}
        onChange={(e) => setProfileBio(e.target.value)}
        className="w-full border-gray-500 input input-lg "
      />
      <div className="absolute top-0 right-0 flex items-center h-full">
      <label
        htmlFor="bioColorModal"
        className="absolute bottom-0 w-12 text-white border border-gray-500 rounded-md cursor-pointer mask btn-md top-2 right-2"
        style={{ backgroundColor: bioColor }}
        onClick={handleBioColorChange}
      >
      </label>
      </div>
    </div>
  </div>
  <input type="checkbox" id="bioColorModal" className="hidden modal-toggle" />
  <div className="modal">
    <div className="flex items-center justify-end w-64 bg-white rounded-lg shadow-lg modal-box p-7">
      <label
        htmlFor="bioColorModal"
        className="absolute text-gray-500 transition-colors duration-300 btn btn-sm btn-circle right-2 top-2 hover:text-gray-700"
      >
        ✕
      </label>
      <SketchPicker color={bioColor} onChange={handleBioColorChange} />
    </div>
  </div>
</div>
          <div className="flex justify-center w-full pt-3">
            <button className="w-full tracking-widest rounded-lg btn btn-outline" onClick={handleProfileUpdate}>
              Save
            </button>
          </div>
        </div>
      </div>
      <hr className="h-px my-8 bg-gray-400 border-0" />
    </div>
  );
}