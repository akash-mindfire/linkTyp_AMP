import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";


const StylesProduct = (props: any) => {

  const data = props.product;


  const containerColor = data?.container?.containerColor;
  const containerBorderColor = data?.container?.borderColor;
  const containerBorderRadius = data?.container?.shape;
  
  const containerTextColor = data?.container?.textColor;



  // Define state for counter
  const [counter, setCounter] = useState(0);

  // Use Next.js useRouter hook to get query parameter
  const router = useRouter();
  const { username } = router.query;

  // Click handler function that updates the counter and sends a POST request to the server
  const handleClick = () => {
    // Update counter state
    setCounter(counter + 1);
    // Log the click data to console
    const productData = counter;
    // Send a POST request to the server with the click data
    axios
      .post(`https://api.linktyp.com/api/dashboard/product/${username}`, {
        numberOfClicksOnProduct: productData,
      })
      .then((res) => {
        
      })
      .catch((err) => {
        
      });
  };


  return (
    <>
      <div className="flex justify-start" >
        <div className="grid max-w-2xl grid-cols-2 gap-2 mx-auto md:grid-cols-3 lg:grid-cols-3">

          {props.data === true ? (
            <></>
          ) : (
            ""
          )}
          {data.product.map((data: any, index: number) => {
            if (data.status !== true) return null;
            const priceValue = data.price.split(/\s+/)[1]
            return (
             
                <section className="" key={index}>

                  <article className="p-1 bg-transparent"
                  style={{
                    borderRadius:containerBorderRadius
                  }}
                  >
                    

                    <div className="relative flex items-center overflow-hidden border-2 h-44 w-44" style={{
                     boxShadow: "rgba(0, 0, 0, 0.8) -5px 5px",
                      background : containerColor,
                      borderRadius: containerBorderRadius === "50px" ? "100px" : containerBorderRadius,
                      // borderColor : containerBorderColor,
                      
                    }}
                    >
                      <a href={data.link} target="_blank">
                      <img src={data.image} alt={data.name} className="object-cover productImage" style={{
                        width: "200px", height: "200px"
                      }} />
                      </a>
                    </div>

                    <div className="p-2 mt-1">
                      <div>
                        <h2 className="font-semibold " style={{
                         overflow: 'hidden',
                         textOverflow: 'ellipsis',
                         display: '-webkit-box',
                         WebkitBoxOrient: 'vertical',
                         WebkitLineClamp: 1,
                         whiteSpace: 'pre-wrap',
                         wordWrap: 'break-word',
                         color:containerTextColor,

                      }}>{data.name}</h2>
                      </div>
                      <div className="flex items-end justify-between mt-1">
                        {
                          priceValue === "0" || priceValue === "0.00" || priceValue === "" ?
                            <div className="mt-7"></div> :
                            (
                              <p>
                                <span className="text-lg font-semibold">{data.price}</span>
                              </p>
                            )
                        }


                      </div>
                      <div className="mt-2">
                        <Link href={data.link} target="_blank">
                          <button className="w-full px-4 py-2 font-bold tracking-wider text-center uppercase bg-transparent border-2 rounded-md hover:bg-none" style={{
                            boxShadow: "rgba(0, 0, 0, 0.8) -5px 5px",
                            color:containerTextColor
                          }}>
                           {priceValue === "0" || priceValue === "0.00" || priceValue === "" ?"Visit":"Buy Now"}
                          </button>
                        </Link>
                      </div>
                    </div>

                  </article>

                </section>

            
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StylesProduct;
