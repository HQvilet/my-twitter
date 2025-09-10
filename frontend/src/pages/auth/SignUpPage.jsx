import {Link} from "react-router-dom"
import { useMutation } from "@tanstack/react-query";

//incons import
import { MdEmail, MdOutlineEmail, MdPassword } from "react-icons/md";
import { FaPen, FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "@components/common/Logo.jsx";
import { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        email : "",
        username : "",
        fullname : "",
        password : ""
    })

    const { mutate, isError, isPending, error } = useMutation({
        mutationFn: async({email, username, fullname, password}) => {
            try{
                const res = await fetch("/api/auth/signup", {
                    method : "POST",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email, username, fullname, password})
                })
                const data = await res.json();

                if(!res.ok) throw new Error(data.error);

                console.log(data);
                return data;
            }catch(error){
                console.error(error);
                toast.error(error.message,);
                throw error;
            }
        },
        mutationKey: ["signup"],
        onSuccess : () => {
            toast.success("Account successfully created.")
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
            <div className="flex flex-col justify-center p-3 rounded-md bg-transparent border-2 border-white">
                <form className="flex flex-col justify-center items-center gap-4 m-1" >
                    <h4 className="text-4xl font-extrabold mb-4">Welcome to my X</h4>
                    <label className=" input bg-transparent focus:bg-yellow-50">
                        <FaPen />
                        <input type="text"
                            name="username"
                            placeholder="User Name"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className=" input bg-transparent focus:bg-yellow-50">
                        <FaPen />
                        <input type="text"
                            name="fullname"
                            placeholder="Full Name"
                            onChange={handleInputChange}
                        />
                    </label>
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
                        <button className="btn bg-transparent border-0 m-0 p-0" onClick={(e) => {e.preventDefault();}}><FaEye/></button>
                    </label>
                    <div className="w-full">
                        <button className="btn btn-info rounded-full w-[100%]" onClick={handleSubmitForm}>
                            {isPending ? "Loading..." : "Sign Up"}
                        </button>
                        {isError && <span className="text-red-500 text-sm self-start pl-4">{error.message} </span>}
                    </div>                    
                </form>
                <div className="flex flex-col gap-2 mt-4 mb-4">

                    <span className="">Already have an account.</span>
                    <Link to="/login" className="flex justify-center">
                        <button className="btn rounded-full w-[80%]">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignUpPage