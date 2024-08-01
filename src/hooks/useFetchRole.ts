import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

const useFetchRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

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

  return { role, loading };
};

export default useFetchRole;
