import $api from "@/api/http"; 
 
export default class AuthService { 
  static async login(email, password, role) { 
    return $api.post("/user/auth", { email, password, role }); 
  } 
 
  static async signUp(email, password, role, cardNumber, country) { 
    console.log(email, password, cardNumber, country); 
    return $api.post("/user/create", { 
      email, 
      password, 
      role, 
      cardNumber, 
      country, 
      confirmationCode: true, 
    }); 
  } 
}