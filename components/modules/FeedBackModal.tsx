import { useState } from "react"
import Router, { useRouter } from "next/router"
import axios from "axios"
import Image from "next/image"
export default function FeedBackModal(props: any) {


  const router = useRouter()
  const query = router.query
  const username = query.username


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const data = {
    name,
    email,
    title,
    message
  }
  const handleSubmit = () => {
    //verify email and all text fileds are not empty
   
    // if (!name || !email || !title || !message) {
    //   console.log('Please fill in all required fields')
    //   return
    // }
    // if (!email.includes('@')) {
    //   console.log('Please Enter Correct Email')
    //   return
    // }

    axios
      .post(`https://api.linktyp.com/api/message/${username}`, data)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }



  const defaultBackgroundColor = "blue"; // Replace with your desired default background color
  const defaultTextColor = "white"; // Replace with your desired default text color
  const defaultBorderRadius = "4px"; // Replace with your desired default border radius

    // background color
    const userData = props.userData || defaultBackgroundColor
    // text color
    const textColor = props.fontColor || defaultTextColor
    // border radius
    const borderRadius = props.borderRadius || defaultBorderRadius


  return (
    <>
      <div className="flex justify-center">
        <Image src="/Group.svg" alt="" width={24} height={24} className="w-24 pb-2" />
      </div>
      <div className="text-center">
          <h2 className="font-sans font-semibold tracking-wider text-lg md:p-4 p-2">Tell us what you think!</h2>
      </div>
      <div className="space-y-4  md:py-10 py-1 font-sans">
        <label className="block" htmlFor="name">
          {/* <p className="">Name</p> */}
          <input className="w-full  border-1  block appearance-none rounded-lg border border-gray-800 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0" type="text" placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="block" htmlFor="email">
          {/* <p>Email Address</p> */}
          <input className="w-full  border-1  block appearance-none rounded-lg border border-gray-800 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0" type="email" placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block" htmlFor="subject">
          {/* <p>Subject</p> */}
          <input className="w-full  border-1  block appearance-none rounded-lg border border-gray-800 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0" type="text" placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="block" htmlFor="name">
          {/* <p >Request</p> */}
          <textarea typeof="text" className="h-32 w-full  border-1  block appearance-none rounded-lg border border-gray-800 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-black focus:outline-none focus:ring-0" placeholder="Request"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </label>
        <div className="modal-action font-sans tracking-widest">
          <label htmlFor="my-modal-6" className="btn w-full border-2 rounded-full" onClick={handleSubmit}
            style={{
              background:"black",
              color:"white"
              
            }}
          >submit</label>
        </div>
      </div>
    </>
  )
}
