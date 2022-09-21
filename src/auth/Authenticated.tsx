import { Navigate, Outlet } from "react-router";
import { useToken } from "./tokenAtom";

export const Authenticated = () => {
  const token = useToken();
  if (!token) {
    return <Navigate to="sign-in" />;
  }
  return <Outlet />;
};
