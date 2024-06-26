import { Link } from "react-router-dom";

export const Dashboard = () => {
  const id = "1";

  return (
    <div className="ml-4">
      <div className="flex h-16 px-8 shadow-lg border border-b-gray-200 items-center justify-between">
        <h1 className="text-2xl">Overview</h1>
      </div>

      <div className="p-8 flex flex-col gap-6">
        <h1>Recent Designs</h1>
        <div className="max-w-[calc(100vw-330px)] max-h-[calc(100vh-120px)] overflow-y-auto flex flex-wrap gap-12">
          <Link
            to={"/design/edit/" + id}
            className="flex flex-col gap-2 hover:cursor-pointer"
          >
            <div className="group relative border border-black rounded-md w-[200px] h-[200px] flex items-center justify-center">
              <img
                className="p-6"
                src="/placeholder/pf.png"
                alt="design_preview"
              />
            </div>
            <p>Design Name</p>
            <p className="text-xs text-brand-gray">Edited 1 day ago</p>
          </Link>
        </div>
        <h1>Latest Commissions</h1>
      </div>
    </div>
  );
};
