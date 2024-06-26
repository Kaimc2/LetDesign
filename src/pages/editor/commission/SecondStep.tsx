export const SecondStep = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1>Select your fabric</h1>

        <div className="flex gap-2 overflow-auto">
          <div className="flex flex-col items-center gap-2 justify-center hover:cursor-pointer">
            <img
              className="min-w-[90px] min-h-[90px] rounded-md shadow-md hover:shadow-none"
              src="/placeholder/placeholder.jpg"
              alt="fabric"
            />
            <p className="text-sm text-gray-500">Cotton</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center hover:cursor-pointer">
            <img
              className="min-w-[90px] min-h-[90px] rounded-md shadow-md hover:shadow-none"
              src="/placeholder/placeholder.jpg"
              alt="fabric"
            />
            <p className="text-sm text-gray-500">Linen</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center hover:cursor-pointer">
            <img
              className="min-w-[90px] min-h-[90px] rounded-md shadow-md hover:shadow-none"
              src="/placeholder/placeholder.jpg"
              alt="fabric"
            />
            <p className="text-sm text-gray-500">Chambray</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1>Select your size</h1>

        <select
          className="py-2 px-3 bg-white border border-gray-500 rounded-md"
          name="size"
          id="size"
        >
          <option>Cloth Size</option>
          <option value="s">S</option>
          <option value="m">M</option>
          <option value="l">L</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        <h1>Color</h1>

        <div className="flex gap-2 overflow-auto">
          <div className="flex flex-col items-center gap-2 justify-center hover:cursor-pointer">
            <div className="min-w-[90px] min-h-[90px] rounded-md border border-gray-300 bg-white shadow-md hover:shadow-none" />
            <p className="text-sm text-gray-500">White</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center hover:cursor-pointer">
            <div className="min-w-[90px] min-h-[90px] rounded-md bg-black shadow-md hover:shadow-none" />
            <p className="text-sm text-gray-500">Black</p>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center hover:cursor-pointer">
            <div className="min-w-[90px] min-h-[90px] rounded-md bg-blue-500 shadow-md hover:shadow-none" />
            <p className="text-sm text-gray-500">Blue</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1>Collar Style</h1>

        <div className="flex gap-2 text-center">
          <div className="border border-gray-400 rounded-md w-[129px] p-2 select-none hover:cursor-pointer shadow-md hover:shadow-none">
            No Collar
          </div>
          <div className="border border-gray-400 rounded-md w-[129px] p-2 select-none hover:cursor-pointer shadow-md hover:shadow-none">
            With Collar
          </div>
        </div>
      </div>
    </>
  );
};
