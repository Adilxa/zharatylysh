import AuthService from "@/services/AuthService";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "./useUser";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { getMe } = useUser();

  const checkAuth = async () => {
    const res = localStorage.getItem("key");

    if (res) {
      await getMe();
      router.push("/");
      setAuth(true);
      return true;
    } else {
      setAuth(false);
      router.push("signin");
    }
  };

  const SignIn = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const res = await AuthService.login(email, password, role).then((res) =>
        localStorage.setItem("key", res.data.id)
      );
      router.push("/");
      setAuth(true);
      return res;
    } catch (e) {}
  };

  const SignUp = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const res = await AuthService.signUp(email, password, role).then((res) =>
        localStorage.setItem("key", res.data.id)
      );
      router.push("/");
      setAuth(true);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  const LogOut = async () => {
    localStorage.removeItem("key");
    checkAuth();
  };

  return {
    isAuth,
    isLoading,
    checkAuth,
    SignIn,
    SignUp,
    LogOut,
  };
};

export default useAuth;
