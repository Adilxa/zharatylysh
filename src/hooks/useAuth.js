import AuthService from "@/services/AuthService";
import { useState } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    const res = localStorage.getItem("key");

    if (res) {
      setAuth(true);
      router.replace("/");
    } else {
      setAuth(false);
      router.push("signin");
    }
  };

  const SignIn = async ({ email, password, role }) => {
    setLoading(true);
    try {
      const res = await AuthService.login(email, password, role)
        .then((res) => localStorage.setItem("key", res.data.id))
        .finally(() => router.replace("/"));

      return res;
    } catch (e) {}
  };

  const SignUp = async ({ email, password, role }) => {
    setLoading(true);

    try {
      const res = await AuthService.signUp(email, password, role)
        .then((res) => localStorage.setItem("key", res.data.id))
        .finally(() => router.replace("/"));

      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    isAuth,
    isLoading,
    checkAuth,
    SignIn,
    SignUp,
  };
};

export default useAuth;
