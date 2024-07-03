import { Outlet } from "react-router-dom";
import { Navbar } from "../common/Navbar";
import { Footer } from "../common/Footer";

import { useContext, useEffect } from "react";
import echo from "../../utils/echo";
import { StatusNotificationResponse } from "../../types/common.types";
import { displayNotification } from "../../utils/helper";
import User from "../../types/user.types";
import { AuthContext } from "../../context/AuthContext";

function HomeLayout() {
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const parseUser: User = storedUser ? JSON.parse(storedUser) : null;

    if (parseUser) {
      const channel = echo
        .channel(`status-notification`)
        .listen("StatusNotification", (e: StatusNotificationResponse) => {
          if (e.message === "Registration successful") {
            updateUser("isVerified", true);
          }
          displayNotification(e.message, e.status);
        });

      return () => {
        channel.stopListening("StatusNotification");
      };
    }
  });

  return (
    <div className="relative h-screen overflow-x-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default HomeLayout;
