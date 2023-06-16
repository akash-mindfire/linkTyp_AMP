import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Producttwo = (props: any) => {


    const data = props.product; 
    const containerColor = data ?.container?.containerColor;
    const containerBorderColor = data?.container?.borderColor;
    const containerBorderRadius = data?.container?.shape;
    const containerTextColor = data?.container?.textColor;  // Define state for counter
    const [counter, setCounter] = useState(0);  // Use Next.js useRouter hook to get query parameter
    const router = useRouter();
    const { username } = router.query;  // Click handler function that updates the counter and sends a POST request to the server
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
                console.log("res", res.data);
            })
            .catch((err) => {
                console.log("error in request", err);
            });
    };
    return (
        <>
            <div className="flex justify-center">
                <div className="w-full max-w-3xl">
                    {props.data === true ? (
                        <div className="flex justify-center pb-2">
                            <h1 className="text-lg tracking-wider">Products</h1>
                        </div>
                    ) : (
                        ""
                    )}
                    {data.product.map((data: any, index: number) => {
                        if (data.status !== true) return null;
                        const priceValue = data.price.split(/\s+/)[1]
                        return (
                            
                            <div className="mx-auto mb-3 transition duration-500 hover:scale-105" onClick={handleClick}
                                key={index}
                                style={{
                                    backgroundColor: containerColor,
                                    border: containerBorderColor,
                                    borderRadius: containerBorderRadius,
                                    color: containerTextColor,
                                }}
                            >
                                <div
                                    className="container flex items-center overflow-hidden"
                                >
                                    <div className="relative flex-grow-0 flex-shrink-0 w-20 h-20">
                                        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
                                            <a target="_blank" href={data.link} >
                                            <img
                                                    src={data.image}
                                                    alt="product"
                                                    width={80}
                                                    height={80}
                                                    quality={75}
                                                    className="absolute top-0 left-0 object-cover object-center w-full h-full p-1 transition duration-500 ease-in-out transform rounded-full hover:scale-110"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="justify-center flex-1 flex-shrink-0 md:pl-8">
                                        <div className="justify-center flex-shrink-0 ml-2 md:ml-1 ">
                                            <p
                                                className="text-sm sm:text-sm md:text-sm line-clamp-1"
                                                style={{
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    display: "-webkit-box",
                                                    WebkitBoxOrient: "vertical",
                                                    WebkitLineClamp: 1,
                                                    color: containerTextColor,
                                                }}
                                            >
                                                {data.name}
                                            </p>
                                            
                                            {
                          priceValue === "0" || priceValue === "$0" || priceValue=== " 0" ||  priceValue=== " 0 " || priceValue === "0.00" || priceValue === " 0.00" || priceValue === ""  ?
                            <div ></div> :
                            (
                              <p>
                                <span className="text-lg font-semibold">{data.price}</span>
                              </p>
                            )
                        }                                                               
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-end mr-8">
                                        <a href={data.link} target="_blank">
                                            <button className="px-2 py-1 font-semibold bg-blue-500 border border-transparent rounded-full text-slate-500 hover:text-white md:ml-12 hover:border-blue-500">
                                                <span className="flex items-center justify-start text-sm text-white md:text-md">
                                                {priceValue === "0" || priceValue === "$0" || priceValue=== " 0" ||  priceValue=== " 0 " || priceValue === "0.00" || priceValue === " 0.00" || priceValue === ""  ?"Visit":"Buy"}
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                           
                        );
                    })}
                </div>
            </div>
        </>
    );
};
export default Producttwo;