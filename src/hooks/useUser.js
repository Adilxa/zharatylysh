import { useState } from "react"; 
import $api from "@/api/http"; 
import { useRouter } from "next/navigation"; 
 
const useUser = () => { 
  const [isLoading, setLoading] = useState(false); 
 
  const [user, setUser] = useState(null); 
 
  const router = useRouter(); 
 
  const getMe = async () => { 
    const id = localStorage.getItem("key"); 
    setLoading(true); 
    if (id) { 
      const res = await $api.get("/user/" + id); 
      setUser(res?.data); 
      setLoading(false); 
      return res?.data; 
    } else { 
      setLoading(false); 
    } 
  }; 
 
  const updateMe = async (data) => { 
    const id = localStorage.getItem("key"); 
    try { 
      const res = await $api 
        .put("/user/" + id, data) 
        .then(() => router.push("/")); 
      return res?.data; 
    } catch (e) { 
      console.log(e); 
    } 
  }; 
 
  //   const SignUp = async ({ email, password, role }) => { 
  //     setLoading(true); 
 
  //     try { 
  //       const res = await AuthService.signUp(email, password, role) 
  //         .then((res) => localStorage.setItem("key", res.data.id)) 
  //         .finally(() => router.replace("/")); 
 
  //       return res; 
  //     } catch (e) { 
  //       console.log(e); 
  //     } 
  //   }; 
 
  return { 
    isLoading, 
    user, 
    getMe, 
    updateMe, 
    setLoading, 
  }; 
}; 
 
export default useUser;