import { Link } from "react-router-dom";
import logo from "../../assets/images/brands/logo.png";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Footer = () => {
  return (
    <footer
      className="flex flex-col lg:flex-row items-center lg:items-start justify-evenly
     gap-[40px] lg:gap-[80px] py-[64px] shadow-inner shadow-gray-200"
    >
      <div className="flex flex-col items-center lg:items-start">
        <Link to={"/"}>
          <img className="w-[124px] mb-3" src={logo} alt="logo" />
        </Link>
        <p className="text-xl lg:text-2xl w-full lg:w-[360px] px-10 lg:p-0 text-center lg:text-left">
          From concept to creation, make your unique fashion statements
          effortlessly.
        </p>
      </div>
      <div className="mt-10 flex flex-col gap-3 text-2xl">
        <h3 className="font-bold">Pages</h3>
        <ul className="flex flex-col gap-3">
          <li className="hover:text-secondary-80">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-secondary-80">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="hover:text-secondary-80">
            <Link to={"/design"}>Design</Link>
          </li>
        </ul>
      </div>
      <div className="mt-10 flex flex-col items-center lg:items-start gap-3 text-2xl">
        <h3 className="font-bold">Contact Us</h3>
        <a href="https://github.com/Kaimc2/LetDesign">
          <FontAwesomeIcon
            className="hover:opacity-60"
            icon={faGithub}
            size="xl"
          />
        </a>
        <h3 className="font-bold">Resources</h3>
        <a className="hover:text-secondary-80" href="http://www.freepik.com">
          Designed by vectorjuice / Freepik
        </a>
      </div>
    </footer>
  );
};
