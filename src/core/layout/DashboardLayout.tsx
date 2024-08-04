import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../assets/images/brands/logo_white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFileInvoiceDollar,
  faGear,
  faHome,
  faPenRuler,
  faRightFromBracket,
  faRuler,
  faShop,
  faSliders,
  faSwatchbook,
  faTrash,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../common/Loader";
import api from "../../utils/api";
import { NavbarItem } from "../../pages/dashboard/components/NavbarItem";
import { NavbarDropdown } from "../../pages/dashboard/components/NavbarDropdown";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { Drawer } from "../../pages/dashboard/components/Drawer";

export const DashboardLayout = () => {
  const [role, setRole] = useState("");
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();
  useAuthRedirect();

  const getRole = useMemo(
    () => async () => {
      api
        .get("/profile", {
          headers: { Authorization: `Bearer ${user?.accessToken}` },
        })
        .then((res) => {
          setRole(res.data.roles[0]);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    },
    [user?.accessToken]
  );

  useEffect(() => {
    getRole();
  }, [getRole]);

  if (loading) return <Loader />;

  return (
    <section className="w-screen h-screen overflow-y-auto md:overflow-hidden">
      <div className="flex justify-between md:justify-normal items-center h-16 px-8 bg-secondary">
        <Link to={"/"}>
          <img className="w-12 h-12 rounded-md" src={logo} alt="Logo" />
        </Link>

        <ul className="hidden md:flex w-full justify-center gap-[80px]">
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

        <button
          onClick={() => setToggleDrawer(!toggleDrawer)}
          className="flex md:hidden"
        >
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>

        {/* Drawer */}
        <Drawer
          user={user}
          isOpen={toggleDrawer}
          isAuthenticated={isAuthenticated}
          setIsOpen={setToggleDrawer}
          logout={logout}
        />
      </div>

      <div className="flex flex-col md:flex-row h-full md:h-[calc(100vh-64px)]">
        <div className="flex flex-row md:flex-col justify-between w-auto mb-4 md:mb-0 md:w-[314px] px-8 py-[26px] border border-r-gray-300 shadow-md">
          <ul className="flex flex-row md:flex-col gap-[26px] no-scrollbar overflow-x-auto">
            <NavbarItem
              name={"Overview"}
              link={"/dashboard"}
              icon={faHome}
              isEnd={true}
            />

            <NavbarDropdown name={"Designs"} icon={faPenRuler}>
              <NavbarItem
                name={"My Designs"}
                link={"/dashboard/designs"}
                icon={faSwatchbook}
                isEnd={true}
              />
              <NavbarItem
                name={"Deleted Designs"}
                link={"/dashboard/designs/removed"}
                icon={faTrash}
              />
            </NavbarDropdown>

            <NavbarItem
              name={"Commissions"}
              link={"/dashboard/commissions"}
              icon={faFileInvoiceDollar}
            />

            {role === "tailor" && (
              <>
                <NavbarItem
                  name={"My Store"}
                  link={"/dashboard/my-store"}
                  icon={faShop}
                />
              </>
            )}
            {role === "admin" && (
              <>
                <NavbarItem
                  name={"Users"}
                  link={"/dashboard/users"}
                  icon={faUserGroup}
                />
                <NavbarItem
                  name={"Stores"}
                  link={"/dashboard/stores"}
                  icon={faShop}
                />
                <NavbarItem
                  name={"Adjustment"}
                  link={"/dashboard/adjustment"}
                  icon={faRuler}
                />
                <NavbarItem
                  name={"Options"}
                  link={"/dashboard/options"}
                  icon={faSliders}
                />
              </>
            )}
            <NavbarItem
              name={"Settings"}
              link={"/dashboard/settings"}
              icon={faGear}
            />

            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="flex md:hidden w-fit items-center gap-2 px-4 py-3 rounded-md hover:bg-accent-80 hover:text-white hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faRightFromBracket} size="lg" />
              <p className="w-16 md:w-auto">Sign Out</p>
            </button>
          </ul>

          <div className="hidden md:flex flex-col gap-6">
            <Link
              to={"/dashboard/settings"}
              className="flex p-2 gap-2 items-center hover:shadow-md border hover:border-gray-300 hover:cursor-pointer rounded-md"
            >
              <img
                className="w-10 h-10 rounded-full"
                src={user?.profilePicture ?? "/placeholder/pf.png"}
                alt="Profile"
              />
              <div>
                <p>
                  {Number(user?.name.length) > 18
                    ? user?.name.slice(0, 18) + "..."
                    : user?.name}
                </p>
                <p>
                  {Number(user?.email.length) > 18
                    ? user?.email.slice(0, 18) + "..."
                    : user?.email}
                </p>
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
              <p>Sign Out</p>
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
