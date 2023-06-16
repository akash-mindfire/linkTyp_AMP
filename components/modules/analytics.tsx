import Navbar from "@/components/Navbar";
import Head from "next/head";
import { PieChart } from "react-minimal-pie-chart";
import { useContext, useEffect, useState } from "react";
import { UserContext } from '../../pages/userContex';
import axios from "axios";
import Cookies from "js-cookie";
export default function Analytics() {

  const token = Cookies.get('access_token');
  const [userData, setuserData] = useState();

  useEffect(() => {
    axios
      .get("https://api.linktyp.com/api/getdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setuserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  //console.log(userData)

  //console.log(userData?.data[0].dashboard.websiteview)
  //console.log(userData?.data[0].dashboard.containerclick)
  //console.log(userData?.data[0].dashboard.productclick)

  const websiteview = userData?.data[0]?.dashboard?.websiteview;
  const containerclick = userData?.data[0]?.dashboard?.containerclick;
  const productclick = userData?.data[0]?.dashboard?.productclick;

  const avatar = userData?.data[0]?.profile?.avatar;
  const name = userData?.data[0]?.profile?.name;
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-full ">
        {/* Analytics card */}
        <div className="flex md:flex-row flex-col w-full ">

          <div className="stat">
            <div className="stat-figure text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </div>
            <div className="stat-title">Link Click</div>
            <div className="stat-value text-primary" style={{fontSize:"1.4rem"}}>{containerclick} times</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div className="stat-title">Website Views</div>
            <div className="stat-value text-secondary" style={{fontSize:"1.4rem"}}>{websiteview} times</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  {avatar ? (
                    <img src={avatar} alt="User Avatar" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center  text-white text-xl font-medium">
                      <img src="/default.png" alt="" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="stat-title">Product Click</div>
            <div className="stat-value" style={{fontSize:"1.4rem"}}>{productclick} times</div>
            {/* <div className="stat-desc text-secondary">31 tasks remaining</div> */}
          </div>
        </div>
      </div>
    </>
  )
}
