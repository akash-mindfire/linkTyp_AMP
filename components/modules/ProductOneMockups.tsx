export default function ProductOneMockups({ userData, backgroundColor }: any) {


  return (
      <div className="" >
          {userData?.product?.map((link: any, index: any) => {
            if (link.status === true) {
              const priceValue = link.price.split(/\s+/)[1]
              console.log(priceValue);
              return (
                <div
                  key={index}
                  
                  className="flex items-center w-[calc(100%-10px)] mx-auto  mt-2 p-3"
                  style={{
                    background: userData?.container.containerColor,
                    color : userData?.container.textColor,
                    borderRadius: userData?.container.shape,
                    fontFamily: userData?.font,
                    border: userData?.container.borderColor,
                  }}
                >
                  <div>
                    <img
                      className="rounded-lg h-[30px] w-[30px]"
                      src={link.image}
                      alt=""
                    />
                  </div>
                  <div className="flex w-full">
                    <div className="max-w-[70%] w-full mx-auto text-[10px]  flex flex-col items-center">
                      <p
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 1,
                        whiteSpace: 'pre-wrap',
                        wordWrap: 'break-word',
                     }}
                      >{link.name}</p>
                      <div className="flex items-end justify-between ">
                      {
                        priceValue === "0" || priceValue === "$0" || priceValue=== " 0" ||  priceValue=== " 0 " || priceValue === "0.00" || priceValue === " 0.00" || priceValue === ""  ?
                          <div className=""></div> :
                          (
                            <p>
                              <span className="text-[10px]">{link.price}</span>
                            </p>
                          )
                      }
                    </div>

                    </div>
                    <div className="flex items-center justify-center">
                      <p className="bg-blue-500 text-[10px] rounded-lg p-1 flex">
                      {priceValue === "0" || priceValue === "$0" || priceValue=== " 0" ||  priceValue=== " 0 " || priceValue === "0.00" || priceValue === " 0.00" || priceValue === "" ?"Visit":"Buy"}
                        <span>
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
                      </p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
  )
}