//incons import
import { MdOutlineEmail, MdPassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@components/common/Logo.jsx";

import {Link} from "react-router-dom"
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })

    const { mutate, isError, error } = useMutation({
        mutationFn: async({email, password}) => {
            try{
                const res = await fetch("/api/auth/login", {
                    method : "POST",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, password})
                })
                const data = await res.json();
                
                if(!res.ok) throw new Error(data.error);

                console.log(data);
                return data;
            }catch(error){
                console.error(error);
                toast.error(error.message);
                throw error;
            }
        },
        mutationKey: ["login"],
        onSuccess : () => {
            toast.success("Login successfully.")
        }
    })

    const handleInputChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name] : e.target.value}))
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        mutate(formData);

    }
    return (
    <>
        <div className="flex justify-center h-screen gap-10 items-center">
            <div className="text-[30vh] ">
                <Logo/>
            </div>
            <div className="flex flex-col justify-center p-3 rounded-md bg-transparent">
                <form className="flex flex-col justify-center items-center gap-4 m-1" >
                    <h4 className="text-4xl font-extrabold mb-4">Login</h4>

                    <label className="input bg-transparent">
                        <MdOutlineEmail/>
                        <input type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="input bg-transparent">
                        <MdPassword />
                        <input type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleInputChange}
                        />
                        <button className="btn bg-transparent border-0 m-0 p-0" onClick={() => {console.log("show password")}}><FaEye/></button>
                    </label>
                    <div className="w-full flex flex-col ">
                        <button className="btn btn-info rounded-full w-[80%] self-center" onClick={handleSubmitForm}>Login</button>
                        {isError && <div className="text-red-500 text-sm self-start">{error.message} </div>}
                    </div>                    
                    
                </form>
                <div className="flex flex-col gap-2 mt-4 mb-4">
                    <Link to="/signup" className="flex">
                        <span className="font-bold underline">Don't have an account yet.</span>
                        {/* <button className="btn rounded-full w-[70%]">Sign Up</button> */}
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}

export default LoginPage