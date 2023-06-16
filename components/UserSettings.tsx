import axios from "axios";
import { BiLinkAlt } from "react-icons/bi";
import { MdPrivacyTip } from "react-icons/md";
import { MdFeedback } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { MdOutlinePolicy } from "react-icons/md";
import { SketchPicker } from "react-color";
import { use, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import EditProfile from "./modules/EditProfile";
import { useRouter } from "next/router";
export default function UserSettings({ getAllData, getProfileData }: any) {
  const [nameColor, setnameColor] = useState("#000000");
  const [isUserNameDivVisible, setIsUserNameDivVisible] = useState(false);
  const [isSeoDivVisible,setSeoDivVisible]= useState(false);
  const [descError,setDescError]=useState("")
  const [usernameErr,setUsernameErr]=useState("")
  const [activeState, setActiveState] = useState({
    profileLink: false,
    website: false,
  });
  const [feedbackForm, setFeedbackForm] = useState({
    feedbackView: false,
    websiteView: false,
  });


console.log(getAllData)

const username = getAllData?.data[0]?.username


useEffect(() => {
  setUserName(getAllData?.data[0]?.username)
}, [getAllData])

  const [seoForm, setSeoForm] = useState({
    seoView: false,
    websiteView: false,
  });
  const [bioColor, setBioColor] = useState("#000000");
  const [showNameColorPicker, setShowNameColorPicker] = useState(false);
  const [showBioColorPicker, setShowBioColorPicker] = useState(false);
  let [profileLinkData, setProfileLinkData] = useState({
    username: "",
    website: "",
  });

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDes, setMetaDes] = useState("");

  const handlemetaTags = (e: any) => {
    e.preventDefault();
    const data = {
      metaTitle: metaTitle,
      metaDescription: metaDes,
    };

   console.log(token)
    axios
      .post(
        `https://api.linktyp.com/api/seo/${username}`,
        data,
      )
      .then((res) => {
        console.log(res)
        if (res.status===200){
          toast.success("success")
          setSeoDivVisible(false)
          setDescError("")
        }  
      })
      .catch((err) => {
        if (err.response.status===400){
          setDescError("Meta title or Meta description can not be empty!")}
        
      });
  };



  const handleNameColorClick = () => {
    setShowNameColorPicker(!showNameColorPicker);
  };
  const handleChange = (e: any) => {
    let { name, value } = e.target;
    setProfileLinkData({ ...profileLinkData, [name]: value });
  };
  const [userName, setUserName] = useState('')
  const handleBioColorClick = () => {
    setShowBioColorPicker(!showBioColorPicker);
  };

  const handleNameColorChange = (newColor: any) => {
    setnameColor(newColor.hex);
  };

  const handleBioColorChange = (newColor: any) => {
    setBioColor(newColor.hex);
  };
  // const changeActiveStates = (name: any) => {
  //   if (name == "profileLink")
  //     setActiveState({ ...activeState, profileLink: !activeState.profileLink });
  //   if (name == "website")
  //     setActiveState({ ...activeState, profileLink: !activeState.website });
  // };
  const changeActiveStates = () => {
      setIsUserNameDivVisible(!isUserNameDivVisible);
  };
  
  const changeSeoDiv=()=>{
    setSeoDivVisible(!isSeoDivVisible)
  }

  const changeFeedbackDiv = (name: any) => {
    if (name == "feedbackView")
      setFeedbackForm({
        ...feedbackForm,
        feedbackView: !feedbackForm.feedbackView,
      });
    if (name == "websiteView")
      setFeedbackForm({
        ...feedbackForm,
        feedbackView: !feedbackForm.websiteView,
      });
  };
  
  







  const token = Cookies.get("access_token");
  const handleUserNameChange = () => {
    if (!userName) {
      setUsernameErr("Username can't be empty!")
      return;
    }
    const data = {userName:userName};
    
  
    axios
      .post(`https://api.linktyp.com/api/profile/username`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setIsUserNameDivVisible(false);
          setUsernameErr("")
          toast.success("username update successfully");
          document.dispatchEvent(new Event('refreshEvent'))
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const metaTitleValue = getAllData?.data[0]?.seoInputs?.metaTitle
  const metaDescriptionValue = getAllData?.data[0]?.seoInputs?.metaDescription
  console.log(metaTitleValue);
  console.log(metaDescriptionValue)

  useEffect(() => {
    setMetaTitle(metaTitleValue)
    setMetaDes(metaDescriptionValue)
  }, [getAllData])










  return (
    <>
      <div className="flex flex-col items-center justify-center w-full pt-10 border-r-2 rounded-2xl">
        <div className="w-full h-full px-5 pb-5 lg:w-4/5 md:px-10 lg:px-3">
          {/* choose font color */}
          <div>
            <EditProfile getData={getProfileData} />
          </div>
          {/* Setting page */}
          <div className="w-full h-full md:px-10">
            <div>
              <p className="pb-5 font-bold tracking-widest uppercase">
                settings
              </p>
            </div>
            <div>
              {/* username div */}
              <div className="block mb-5 shadow-lg cursor-pointer alert">
                <div
                  className="flex justify-between w-full"
                  onClick={() => changeActiveStates()}
                >
                  <div>
                    <BiLinkAlt className="inline-block mr-2 text-2xl" />
                    <span className="font-mono tracking-widest">
                      Change Username
                    </span>
                  </div>
                  <div>
                    <IoIosArrowUp
                    />
                  </div>
                </div>
                <div
                  className={isUserNameDivVisible ? "block" : "hidden"}
                  style={{ marginTop: "4%" }}
                >
                  <div
                    className="w-full mt-1 form-address"

                  >
                    <div className="pb-3 form-control">
                      <label className="label">
                        <span className="pt-2 font-semibold label-text">Enter Username</span>
                      </label>
                      <label className="input-group">
                        <span >Username</span>
                        <input type="text" onChange={(e) => setUserName(e.target.value)} value={userName} placeholder="Your name" className="w-full input input-bordered"
                        />
                        
                      </label>
                      <p className="m-1 text-sm text-red-500">{usernameErr}</p>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-4">
                    <div className="w-3/5">
                      <button className="w-4/5 p-3 text-xl font-bold text-white bg-black rounded-full" onClick={handleUserNameChange}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* seo form */}
              <div className="block mb-5 shadow-lg cursor-pointer alert">
                <div
                  className="flex justify-between w-full"
                  onClick={() => changeSeoDiv()}
                >
                  <div>
                    <BiLinkAlt className="inline-block mr-2 text-2xl" />
                    <span className="font-mono tracking-widest">SEO</span>
                  </div>
                  <div>
                    <IoIosArrowUp
                      style={
                        seoForm.seoView ? { transform: "rotate(180deg)" } : {}
                      }
                    />
                  </div>
                </div>

                <div
                  className={isSeoDivVisible ? 'block' : 'hidden'}
                  style={{ marginTop: "4%" }}
                >
                  <div
                    className="w-4/5 mt-1 form-address"
                    style={{ marginLeft: "5%" }}
                  >
                    <label className="label-text">Meta Title</label>
                    <input
                      type="text"
                      required
                      name="metaTitle"
                      id="metaTitle"
                      autoComplete="off"
                      className="w-full input input-bordered input-black"
                      style={{ width: "100%" }}
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                    />

                  </div>
                  <div
                    className="w-4/5 mt-6 form-address "
                    style={{ marginLeft: "5%" }}
                  >
                    <label className="label-text">Meta description</label>
                    <input
                      type="text"
                      required
                      name="metaDes"
                      id="metaDes"
                      autoComplete="off"
                      className="w-full input input-bordered input-black"
                      style={{ width: "100%" }}
                      value={metaDes}
                      onChange={(e) => setMetaDes(e.target.value)}
                    />
                    <p className="m-1 text-sm text-red-500">{descError}</p>

                  </div>
                  <div className="flex justify-center w-full mt-4">
                    <div className="w-3/5">
                      <button className="w-4/5 p-3 text-xl font-bold text-white bg-black rounded-full" onClick={handlemetaTags}>
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Send Feedback */}
              <div className="block mb-5 shadow-lg cursor-pointer alert">
                <div
                  className="flex justify-between w-full"
                  onClick={() => changeFeedbackDiv("feedbackView")}
                >
                  <div>
                    <BiLinkAlt className="inline-block mr-2 text-2xl" />
                    <span className="font-mono tracking-widest">
                      Send Feedback
                    </span>
                  </div>
                  <div>
                    <IoIosArrowUp
                      style={
                        feedbackForm.feedbackView
                          ? { transform: "rotate(180deg)" }
                          : {}
                      }
                    />
                  </div>
                </div>
                <div
                  className={feedbackForm.feedbackView ? "block" : "hidden"}
                  style={{ marginTop: "4%" }}
                >
                  <div>
                    <div className="google-form-wrapper">
                      <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSeh3ecLmEIZOJr7p_3MJD8r60GX7JBwkRT-44QY5wJYigWAbA/viewform?usp=sf_link"
                        frameBorder="0"
                      ></iframe>
                    </div>
                  </div>
                  <div className="flex justify-center w-full mt-4">
                    <div className="w-3/5">
                      <button className="w-4/5 p-3 text-xl font-bold text-white bg-black rounded-full">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                {/* Privacy Policy div */}
              <div
                className="block mb-5 shadow-lg cursor-pointer alert"
                onClick={() => {
                  window.open("https://www.typof.com/privacy-policy", "_blank");
                }}
              >
                <div className="flex justify-between">
                  <div>
                    <MdPrivacyTip className="inline-block mr-2 text-2xl" />
                    <span className="font-mono tracking-widest">
                      Privacy Policy
                    </span>
                  </div>
                </div>
              </div>              
              {/* Terms And conditions */}
              <div
                className="block mb-5 shadow-lg cursor-pointer alert"
                onClick={() => {
                  window.open("https://www.typof.com/terms-conditions", "_blank");
                }}
              >
                <div className="flex justify-between">
                  <div>
                    <MdPrivacyTip className="inline-block mr-2 text-2xl" />
                    <span className="font-mono tracking-widest">
                      Terms And conditions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
