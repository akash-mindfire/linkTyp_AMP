import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import ContentLoader from "react-content-loader"
export default function ProductCardSkeleton() {

  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (cardIndex:any) => {
    setSelectedCard(cardIndex);
  };


  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-10">
        {/* card-1 */}
        
        <div className={`bg-white border-2 shadow-sm rounded-md overflow-hidden flex items-center px-2 ${
            selectedCard === 0 ? 'border-blue-500' : ''
          }`} onClick={() => handleCardClick(0)}
          >
          <div className="w-1/3">
            <Skeleton height={100} width={100} style={{ borderRadius: '50%' }} />
          </div>
          <div className="flex-1 pl-4 pr-2">
            <Skeleton width={150} height={20} className="mb-2" />
            <Skeleton width={120} height={16} className="mb-2" />
            <Skeleton width={80} height={24} className="mb-2" />
          </div>
          <div className="w-1/4 text-right">
            <Skeleton width={80} height={32} />
          </div>
        </div>
        {/* card-2 */}
        <div className={`bg-white border-2 shadow-sm rounded-md overflow-hidden flex items-center p-2 ${
            selectedCard === 1 ? 'border-blue-500' : ''
          }`}
          onClick={() => handleCardClick(1)}>
          <div className="w-1/3">
            <Skeleton height={100} width={100} />
          </div>
          <div className="flex-1 pl-4 pr-2">
            <Skeleton width={150} height={20} className="mb-2" />
            <Skeleton width={120} height={16} className="mb-2" />
            <Skeleton width={80} height={24} className="mb-2" />
          </div>
          <div className="w-1/4 text-right">
            <Skeleton width={80} height={32} />
          </div>
        </div>
        {/* card-3 */}
        <div className={`bg-white border-2 shadow-sm rounded-md overflow-hidden p-2 flex flex-col items-center ${
            selectedCard === 2 ? 'border-blue-500' : ''
          }`}
          onClick={() => handleCardClick(2)}>
          <div className="mb-4">
            <Skeleton height={100} width={350} />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <Skeleton width={340} height={20} className="mb-2" />
            <Skeleton width={340} height={16} className="mb-2" />
          </div>
          <div className="flex items-center justify-center w-full">
            <Skeleton width={80} height={32} style={{ borderRadius: "10%" }} />
          </div>
        </div>

        {/* card-4 */}
        <div className={`bg-white  shadow-sm border-2 rounded-md overflow-hidden p-2 flex flex-col items-center ${selectedCard === 3 ? 'border-blue-500' : ''}`} onClick={() => handleCardClick(3)}>
          <div className="mb-4">
            <Skeleton height={150} width={350} />
          </div>
          <div className="flex-1 flex  justify-center">
            <div>
              <Skeleton width={220} height={20} className="mb-2" />
              <Skeleton width={220} height={16} className="mb-2" />
            </div>
            <div className="flex-1 pl-3">
              <Skeleton width={80} height={32} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}