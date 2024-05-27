import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between pt-[65px] pb-[115px] px-[160px]">
      <h1 className="py-[20px] px-[40px] bg-gray-300 rounded-md">Logo</h1>
      <ul className="flex gap-[80px]">
        <li className="hover:underline">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="hover:underline">
          <Link to={"/about"}>About</Link>
        </li>
        <li className="hover:underline">
          <Link to={"/editor"}>Editor</Link>
        </li>
      </ul>
      <button
        className="px-[20px] py-[10px] bg-[#5C19EB] rounded-md text-white 
      "
      >
        Sign Up
      </button>
    </div>
  );
};
