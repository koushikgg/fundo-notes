import axios from "axios";

export const LoginApi = async(data)=>{
    console.log("hiiiii");
    const res = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/user/login", data)
    return res;
}

export const SignupApi = async (data)=>{
    console.log("hoooo");
    const res = await axios.post("https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",data);
    console.log(res);
    return res;
} 
