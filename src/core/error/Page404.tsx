import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className="flex h-[calc(100vh-170px)] justify-center items-center">
      <p className="text-4xl text-gray-400">404 | Page not Found</p>
    </div>
  );
};

export const Page404Alt = () => {
  return (
    <div className="flex flex-col h-screen gap-2 justify-center items-center">
      <p className="text-4xl text-gray-400">404 | Page not Found</p>
      <Link to={"/"}>Go back</Link>
    </div>
  );
};
