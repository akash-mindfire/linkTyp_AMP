import axios from "axios";
import { log } from "console";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go"
type CardContainerProps = {
    addCard: () => void;
    addProductCard: () => void;
    addTypofProductCard: () =>void;
};

export default function CardContainer1({ addCard, addProductCard ,addTypofProductCard}: CardContainerProps) {
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [addcardText, setAddcardText] = useState('');
    const [typofEmail, setTypofEmail] = useState('');
    const [typofPassword, setTypofPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [socialLink, setSocialLink] = useState('');
    const [status, setStatus] = useState(false)

    const [addProductImagelink, setProductImageLink] = useState("")
    const [addProductName, setProductName] = useState("")
    const [addProductlink, setProductLink] = useState("")
    const [addProductPrice, setProductPrice] = useState("")
    const [productStatus, setProductStatus] = useState(false)
    console.log(addProductImagelink)
    console.log(addProductName)
    console.log(addProductlink)
    console.log(addProductPrice);
    console.log(productStatus);
    const demoProducts = [
        { pName: "abc", pLink: "abc.com", pImage: "https://img.freepik.com/free-vector/hand-drawn-media-naranja-illustration_23-2150074406.jpg?w=900&t=st=1683108451~exp=1683109051~hmac=d64526ddf39d152314aded2cba2b915f8dfd673dbff055c04df680cf68fbe664", pPrice: 100, status: false },
        { pName: "def", pLink: "abc.com", pImage: "https://img.freepik.com/free-vector/hand-drawn-media-naranja-illustration_23-2150074406.jpg?w=900&t=st=1683108451~exp=1683109051~hmac=d64526ddf39d152314aded2cba2b915f8dfd673dbff055c04df680cf68fbe664", pPrice: 200, status: false },
        { pName: "ghi", pLink: "abc.com", pImage: "https://img.freepik.com/free-vector/hand-drawn-media-naranja-illustration_23-2150074406.jpg?w=900&t=st=1683108451~exp=1683109051~hmac=d64526ddf39d152314aded2cba2b915f8dfd673dbff055c04df680cf68fbe664", pPrice: 300, status: false },


    ]



    const handleAddCardClick = () => {
        addCard(addcardText, socialLink, status);
    };
    const handleAddProductCardClick = () => {
        addProductCard(addProductImagelink, addProductName, addProductlink, addProductPrice, productStatus)
    }


    // Icons iamge 
    const icons = [
        {
            id: 1,
            img: "/github.svg",
            name: "Github",
            link: 'https://www.github.com',
        },
        {
            id: 2,
            img: "/instagram.svg",
            name: "Instagram",
            link: 'https://www.instagram.com',
        },
        {
            id: 3,
            img: "/linkedin.svg",
            name: "LinkedIn",
            link: 'https://www.linkedin.com',
        },
        {
            id: 4,
            img: "/facebook.svg",
            name: "FaceBook",
            link: 'https://www.facebook.com',
        },
        {
            id: 4,
            img: "/twitter.svg",
            name: "Twitter",
            link: 'https://www.twitter.com',
        },
        {
            id: 5,
            img: "/pintrest.svg",
            name: "Pintrest",
            link: 'https://www.pintrest.com',
        },
        {
            id: 6,
            img: "/other.svg",
            name: "Other"
        },
    ]

    const [showContent, setShowContent] = useState(false);


    const handleSocialLink = (link: any) => {
        setSocialLink(link);
    };


    const validateLoginEmail = (Loginemail: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(Loginemail);
    };

    const handleTypfofLogin = (email: any, password: any) => {
        const data = {
            email: email,
            password: password,
        };
        console.log(data);


        axios
            .post('https://typofapi.typof.co/v1/auth/login', data)
            .then((res) => {
                // console.log(res);
                console.log(res.data.status);
                if (res.data.status === true) {
                    console.log(res.data.access_token);
                    // localStorage.setItem('access_token', res.data.access_token);
                    // Cookies.set('access_token', res.data.access_token);
                    Cookies.set('typof_access_token', res.data.access_token, { expires: 7 });
                    // Cookies.set('access_token',  res.data.access_token, { expires: 30, sameSite: 'none', secure: true });
                    axios.get('https://mobileapi.typof.com/v1/product', {

                        headers: {
                            Authorization: `Bearer ${res.data.access_token}`
                        }
                    })
                        .then((res) => {
                            console.log(res.data);
                            // push data to Home page with router.push
                            // setUserData(res.data);
                            // router.push('/dashBoard');
                        })
                        .catch((err) => {
                            console.log(err);
                            // handle error
                        });

                    console.log('Login Successful');
                    setIsLoggedin(true)
                    // LoginSuccessNotification();
                } else {
                    // console.log('Login Failed');
                    // setLoginError('Invalid Email or Password');
                }
            })
            .catch((err) => {
                console.log(err);
                //   LoginErrorNotification();
            });


    }
    const handleAddProductCardAndTypofProduct = ({ pImage, pName, pLink, pPrice }: { pImage: any, pName: any, pLink: any, pPrice: any }) => {
        setProductImageLink(pImage); 
        setProductLink(pLink);
        setProductName(pName);
        setProductPrice(pPrice);
        setStatus(false);
      };
      
      useEffect(() => {
        if (addProductName!="") {
          addTypofProductCard(addProductImagelink, addProductlink, addProductName, addProductPrice, productStatus);
          
        }
      }, [addProductName]);
    
    
    



    return (
        <>
            <div>
                <div className="flex flex-col items-center justify-center w-full px-10">
                    {/* button div */}
                    <div className="flex justify-center w-2/3 pb-5">
                        <button className="w-full gap-2 btn" onClick={() => setShowContent(!showContent)}>
                            Add Link
                            <GoPlus className="text-xl" />
                        </button>
                    </div>
                    {/* content div */}
                    {showContent && (
                        <div className="animate-fade-in">
                            <div>
                                <p className="pb-10 font-bold uppercase">share your content</p>
                            </div>
                            {/*  */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="grid w-full grid-cols-4 gap-8 p-2 px-2 md:grid-cols-5 md:px-20 rounded-3xl">

                                    {
                                        icons.map((items, index) => {
                                            return (
                                                <div className="avatar" key={index} onClick={() => handleSocialLink(items.link)}>
                                                    <div className="w-10 rounded-full ring ring-black ring-offset-base-100 ring-offset-2">
                                                        <img src={items.img} className="object-fill " />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* input files for card  */}
                            <div className="w-full">
                                <div className="w-full pt-2 form-control">
                                    <label className="label">
                                        <span className="label-text">Card Title</span>
                                    </label>
                                    <input type="text" value={addcardText} onChange={(e) => setAddcardText(e.target.value)} placeholder="Enter Card Title" className="w-full rounded-full input input-bordered" />
                                </div>
                                <div className="w-full pt-2 form-control">
                                    <label className="label">
                                        <span className="label-text">Card Link</span>
                                    </label>
                                    <input type="text" value={socialLink} onChange={(e) => setSocialLink(e.target.value)} placeholder="Enter Social Link" className="rounded-full input input-bordered" />
                                </div>

                                <div className="w-1/3 pt-2 form-control">
                                    <label className="cursor-pointer label">
                                        <span className="label-text">Status</span>
                                        <input type="checkbox" className="toggle"
                                            checked={status}
                                            onChange={(e) => setStatus(e.target.checked)}
                                        />
                                    </label>
                                </div>
                            </div>
                            <button className="w-full mt-10 rounded-full btn" onClick={handleAddCardClick} >save</button>
                            {/* input field for card end */}


                            {/* add your products start*/}
                            <div className="flex flex-col items-center justify-center px-20 pt-10">
                                <div><p className="font-bold uppercase">Add Your Products</p></div>
                                <div className="flex">

                                    <div className="flex flex-col items-center justify-center w-20 h-20 mt-10 mr-10 border-2 border-blue-500 rounded-lg aspect-square">
                                        <label htmlFor="storeLoginModal">Typof Store Login</label>
                                        <input type="checkbox" id="storeLoginModal" className="modal-toggle" />
                                        <div className="modal">
                                            <div className="relative modal-box h-1/2">
                                                {
                                                    isLoggedin ?
                                                        <div >
                                                            <label htmlFor="storeLoginModal" className="absolute btn btn-sm btn-circle right-2 top-2"> ✕</label>
                                                            <h3 className="text-lg font-bold">Your products in typof</h3>
                                                            {
                                                                demoProducts.map((p: any, index: any) => {
                                                                    return (
                                                                        <div
                                                                            key={index}
                                                                            className="flex items-center justify-between w-full h-32 gap-1 px-3 py-1 my-4 border-2 border-gray-100 rounded-lg cursor-pointer stat md:px-3"
                                                                            style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px" }}
                                                                        >
                                                                            <div className="relative w-16 h-16 mr-5 md:w-20 md:h-20">
                                                                                <img
                                                                                    className="object-cover w-full h-full rounded-lg "
                                                                                    src={p.pImage}
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                            <div>
                                                                                <span className="font-sans text-base">
                                                                                    {p.pName}
                                                                                </span>
                                                                                <p className="font-mono text-sm">{p.pLink}</p>
                                                                                <p className="font-mono text-sm">{p.pPrice}</p>
                                                                            </div>
                                                                            <button className="btn" onClick={() => handleAddProductCardAndTypofProduct({
                                                                                pImage: p.pImage,
                                                                                pName: p.pName,
                                                                                pLink: p.pLink,
                                                                                pPrice: p.pPrice
                                                                            })}>
                                                                                Add
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                })
                                                            }

                                                        </div>

                                                        : <>
                                                            <label htmlFor="storeLoginModal" className="absolute btn btn-sm btn-circle right-2 top-2"> ✕</label>
                                                            <h3 className="text-lg font-bold">Log in</h3>
                                                            <p>If you have a store in typof then you can integrate your product to linktyp.You can simply login and add your desired products in linktyp from your store</p>
                                                            <div className="w-full max-w-xs form-control">
                                                                <label className="label">
                                                                    <span className="label-text">Email</span>
                                                                </label>
                                                                <input type="text" value={typofEmail} onChange={(e) => setTypofEmail(e.target.value)} placeholder="Your Email ID" className="w-full max-w-xs input input-bordered" />

                                                                <label className="label">
                                                                    <span className="label-text">Password</span>
                                                                </label>
                                                                <input type="text" value={typofPassword} onChange={(e) => setTypofPassword(e.target.value)} placeholder="Your password" className="w-full max-w-xs input input-bordered" />
                                                                <button className="w-full mt-10 rounded-full btn" onClick={() => handleTypfofLogin(typofEmail, typofPassword)} >Log</button>

                                                            </div>
                                                        </>
                                                }
                                            </div>

                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-20 h-20 mt-10 border-2 border-blue-500 rounded-lg aspect-square">
                                        <label htmlFor="my-modal-3" className="btn"><GoPlus className="p-2 text-5xl" /></label>


                                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                                        <div className="modal">
                                            <div className="relative modal-box">
                                                <label htmlFor="my-modal-3" className="absolute btn btn-sm btn-circle right-2 top-2"> ✕</label>
                                                <h3 className="text-lg font-bold">Add your product</h3>
                                                <div className="w-full max-w-xs form-control">
                                                    <label className="label">
                                                        <span className="label-text">Image URL</span>
                                                    </label>
                                                    <input type="text" value={addProductImagelink} onChange={(e) => setProductImageLink(e.target.value)} placeholder="Type here" className="w-full max-w-xs input input-bordered" />
                                                    <label className="label">
                                                        <span className="label-text">Product name</span>
                                                    </label>
                                                    <input type="text" value={addProductName} onChange={(e) => setProductName(e.target.value)} placeholder="Type here" className="w-full max-w-xs input input-bordered" />
                                                    <label className="label">
                                                        <span className="label-text">Product link</span>
                                                    </label>
                                                    <input type="text" value={addProductlink} onChange={(e) => setProductLink(e.target.value)} placeholder="Type here" className="w-full max-w-xs input input-bordered" />
                                                    <label className="label">
                                                        <span className="label-text">Product price</span>
                                                    </label>
                                                    <input type="text" placeholder="Type here" onChange={(e) => setProductPrice(e.target.value)} className="w-full max-w-xs input input-bordered" />
                                                    <div className="w-1/3 pt-2 form-control">
                                                        <label className="cursor-pointer label">
                                                            <span className="label-text">Status</span>
                                                            <input type="checkbox" className="toggle"
                                                                checked={productStatus}
                                                                onChange={(e) => setProductStatus(e.target.checked)}
                                                            />
                                                        </label>
                                                    </div>
                                                    <button className="w-full mt-10 rounded-full btn" onClick={handleAddProductCardClick} >save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}




{/* <div className="max-w-md mt-8 mb-8 bg-white border border-gray-100 shadow-sm shadow-gray-500/20 sm:rounded-lg sm:shadow-lg lg:mt-0">
<div className="relative p-4 py-8 border-b border-gray-300 sm:px-8">
  <h3 className="inline-block mb-1 text-3xl font-medium"><span className="mr-4">Get a quote!</span><span className="inline-block px-2 py-1 text-sm text-blue-700 bg-blue-100 rounded-md sm:inline">Quick Response</span></h3>
  <p className="text-gray-600">Contact us for custom use cases</p>
</div>
<div className="p-4 sm:p-8">
  <input id="name" type="text" className="w-full px-4 py-2 mt-4 overflow-auto border border-gray-300 rounded-lg shadow-sm resize-y focus:border-blue-500 focus:outline-none hover:border-blue-500" placeholder="Enter your name" />
  <input id="email" type="email" className="w-full px-4 py-2 mt-8 overflow-auto border border-gray-300 rounded-lg shadow-sm resize-y peer focus:border-blue-500 focus:outline-none hover:border-blue-500" placeholder="Enter your email" />
  <div className="hidden mt-1 text-xs text-left peer-invalid:block text-rose-600">Email format Incorrect. Please complete the email</div>
  <label className="inline-block max-w-full mt-5 mb-2">Tell us about your company</label>
  <textarea id="about" className="w-full px-4 py-2 mb-8 overflow-auto border border-gray-300 rounded-lg shadow-sm resize-y focus:border-blue-500 focus:outline-none hover:border-blue-500"></textarea>
  <button className="w-full p-3 font-medium text-center text-white transition bg-blue-700 border border-blue-700 rounded-lg outline-none focus:ring hover:border-blue-700 hover:bg-blue-600 hover:text-white">Send</button>
</div>
</div> */}