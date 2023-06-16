import Link from "next/link";

export default function ProductTwomockups({userData} : any) {
    return (
        <>
    <div className="flex justify-start"  style={{
        color : userData?.container.textColor,
    }}>
        <div className="grid w-full grid-cols-2 gap-2 p-2 mx-auto">

          {/* {userData.data === true ? (
            <></>
          ) : (
            ""
          )} */}
          {userData?.product.map((data: any, index: number) => {
            if (data.status !== true) return null;
            const priceValue = data.price.split(/\s+/)[1]
            return (
              <>
                <section className="flex justify-center w-full" key={index}>

                  <article className="bg-transparent rounded-xl">

                    <div className="relative flex items-end w-20 h-20 overflow-hidden rounded-xl"
                    >
                      <img src={data.image} alt={data.name} className="object-cover productImage" style={{
                        width: "100px", height: "100px"
                      }} />

                    </div>

                    <div className="mt-1">
                      <div>
                        <h2 className=" font-base text-[10px]" style={{
                         overflow: 'hidden',
                         textOverflow: 'ellipsis',
                         display: '-webkit-box',
                         WebkitBoxOrient: 'vertical',
                         WebkitLineClamp: 1,
                         whiteSpace: 'pre-wrap',
                         wordWrap: 'break-word',
                      }}>{data.name}</h2>
                      </div>
                      <div className="flex items-end justify-between mt-1">
                        {
                          priceValue === "0" || priceValue === "$0" || priceValue=== " 0" ||  priceValue=== " 0 " || priceValue === "0.00" || priceValue === " 0.00" || priceValue === ""  ?
                            <div className="mt-6"></div> :
                            (
                              <p>
                                <span className="text-[10px]">{data.price}</span>
                              </p>
                            )
                        }
                      </div>
                      <div className="">
                        <Link href={data.link} target="_blank">
                          <button className="border-2 bg-transparent  text-[10px] w-full  text-center tracking-wider uppercase hover:bg-none rounded-md"
                          >
                             {priceValue === "0" || priceValue === "$0" || priceValue=== " 0" ||  priceValue=== " 0 " || priceValue === "0.00" || priceValue === " 0.00" || priceValue === ""  ?"Visit":"Buy Now"}
                          </button>
                        </Link>
                      </div>
                    </div>

                  </article>

                </section>

              </>
            );
          })}
        </div>
      </div>
        </>
    )
}