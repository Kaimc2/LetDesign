import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/brands/logo_white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faFileInvoiceDollar,
  faGear,
  faHome,
  faPenRuler,
  faRightFromBracket,
  faSwatchbook,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="flex items-center h-16 px-8 bg-secondary">
        <Link to={"/"}>
          <img className="w-12 h-12 rounded-md" src={logo} alt="Logo" />
        </Link>

        <ul className="flex w-full justify-center gap-[80px]">
          <li className="hover:text-accent-80">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-accent-80">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="hover:text-accent-80">
            <Link to={"/design"}>Design</Link>
          </li>
        </ul>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex flex-col justify-between w-[314px] px-8 py-[26px] border border-r-gray-300 shadow-md">
          <ul className="flex flex-col gap-[26px]">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent-80 text-white flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                  : "flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
              }
              end
            >
              <FontAwesomeIcon icon={faHome} size="lg" />
              <p>Overview</p>
            </NavLink>

            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-accent-80
               hover:text-white hover:cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPenRuler} size="lg" />
                <p>Designs</p>
              </div>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={
                  isOpen
                    ? "rotate-180 transition-transform"
                    : "rotate-0 transition-transform"
                }
              />
            </div>
            {isOpen && (
              <div className="flex flex-col gap-2 ml-6">
                <NavLink
                  to={"/dashboard/designs"}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "bg-accent-80 text-white flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                      : "flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                  }
                >
                  <FontAwesomeIcon icon={faSwatchbook} size="lg" />
                  <p>My Designs</p>
                </NavLink>
                <NavLink
                  to={"/dashboard/designs/removed"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-accent-80 text-white flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                      : "flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                  }
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                  <p>Deleted Designs</p>
                </NavLink>
              </div>
            )}

            <NavLink
              to={"/dashboard/commissions"}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent-80 text-white flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                  : "flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
              }
            >
              <FontAwesomeIcon icon={faFileInvoiceDollar} size="lg" />
              <p>Commissions</p>
            </NavLink>
            <NavLink
              to={"/dashboard/settings"}
              className={({ isActive }) =>
                isActive
                  ? "bg-accent-80 text-white flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
                  : "flex items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
              }
            >
              <FontAwesomeIcon icon={faGear} size="lg" />
              <p>Settings</p>
            </NavLink>
          </ul>

          <div className="flex flex-col gap-6">
            <Link
              to={"/dashboard/settings"}
              className="flex p-2 gap-2 items-center hover:shadow-md border hover:border-gray-300 hover:cursor-pointer rounded-md"
            >
              <img
                className="w-10 h-10 rounded-full"
                src="/placeholder/pf.png"
                alt="Profile"
              />
              <div>
                <p>{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </Link>
            <div className="bg-gray-400 h-1 rounded-md"></div>
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex w-full items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
              <p>Logout</p>
            </button>
          </div>
        </div>

        <div className="flex-grow h-full">
          <Outlet />
        </div>
      </div>
    </section>
  );
};
