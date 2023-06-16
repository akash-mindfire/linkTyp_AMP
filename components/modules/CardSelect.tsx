export default function CardStyle() {
    return (
      <div className="flex justify-center">
        <div className="pb-20 text-gray-700">
          {/* Header */}
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-base font-bold tracking-wider text-gray-700 uppercase sm:text-xl">
              Select Card Style
            </h2>
          </div>
  
          {/* Card options */}
          <div className="grid pt-10 lg:grid-cols-2">
            {/* Placeholder card */}
            <div className="flex items-center justify-center w-full h-20 border-2 rounded-3xl">
              <h1 className="tracking-widest uppercase">Card Style</h1>
            </div>
  
            {/* Card options */}
            <div className="relative flex flex-col items-center justify-center h-full w-72 lg:w-96">
              {/* Option 1 */}
              <div className="relative w-72 lg:w-96">
                <input className="hidden peer" id="radio_2" type="radio" name="radio" />
                <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-blue-500 right-4 top-1/2"></span>
                <label
                  className="flex p-4 pr-20 bg-gray-400 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-blue-400 peer-checked:bg-blue-50"
                  htmlFor="radio_2"
                >
                  <div className="ml-5"></div>
                </label>
              </div>
  
              {/* Option 2 */}
              <div className="relative mt-10 w-72 lg:w-96">
                <input className="hidden peer" id="radio_1" type="radio" name="radio" checked />
                <span className="box-content absolute block w-3 h-3 -translate-y-1/2 bg-white border-8 border-gray-300 rounded-full peer-checked:border-blue-500 right-4 top-1/2"></span>
                <label
                  className="flex p-4 pr-20 bg-gray-400 border border-gray-300 rounded-lg cursor-pointer select-none peer-checked:border-2 peer-checked:border-blue-400 peer-checked:bg-blue-50"
                  htmlFor="radio_1"
                >
                  <div className="ml-5"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-400 border-0 "/>
      </div>
    );
  }
  