"use client";
import React, { useState } from "react";

// icons
import { GoTriangleDown } from "react-icons/go";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

// lib
// definitions
// signup form schema 
import { SignupFormSchema } from "../lib/definitions";
// actions
// auth
// signup
import { signup } from "../actions/auth";

interface ErrorState {
  flag: string;
  errors: string[];
}

export default function SignupForm() {
  // states
  // local
  // focus
  const [focus, setFocus] = useState("");
  // username
  const [username, setUsername] = useState("");
  // email
  const [email, setEmail] = useState("");
  // password
  const [password, setPassword] = useState("");
  //   is password hide
  const [isPasswordHide, setIsPasswordHide] = useState(true);

  //   social logins
  const [socialLogin, setSocialLogin] = useState({
    options: [
      {
        text: "google",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/480px-Google_%22G%22_logo.svg.png",
      },
      {
        text: "facebook",
        image:
          "https://cdn.pixabay.com/photo/2021/06/15/12/51/facebook-6338507_1280.png",
      },
      {
        text: "instagram",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png",
      },
      {
        text: "twitter",
        image:
          "https://dwglogo.com/wp-content/uploads/2019/02/Twitter_logo.png",
      },
    ],
  });

  // errors 
  const [errors, setErrors] = useState<ErrorState>({
    flag: "",
    errors: [],
  });

  // handle sign up form
  const signupFormHandler =  async () => {
    const validatedFields = SignupFormSchema.safeParse({username,email,password})

    if(!validatedFields.success){
      const formFieldErrors = validatedFields.error.flatten().fieldErrors;
      if (formFieldErrors?.username?.length) {
        setErrors((prev) => {
          return {
            ...prev,
            flag: "username",
            errors: formFieldErrors?.username ?? [],
          };
        });
      } else if (formFieldErrors?.email?.length) {
        setErrors((prev) => {
          return {
            ...prev,
            flag: "email",
            errors: formFieldErrors?.email?? [],
          };
        });
      } else if (formFieldErrors?.password?.length) {
        setErrors((prev) => {
          return {
            ...prev,
            flag: "password",
            errors: formFieldErrors?.password ?? [],
          };
        });
      }else {
        setErrors(prev => {
          return {
            ...prev,
            flag: "",
            errors: []
          }
        })
      }
    }else {
      const formData = new FormData()
      formData.append("username",username)
      formData.append("email",email)
      formData.append("password",password)
      await signup(formData)
    }
  }

  return (
    <main>
      <div className="p-5 rounded-md overflow-hidden shadow-xl min-w-96">
        {/* header */}
        <header className="flex items-center justify-end mb-3">
          {/* lang */}
          <div className="px-1.5 py-1 cursor-pointer flex items-center gap-x-0.5 text-sm text-neutral-500">
            {/* text */}
            <span>English(USA)</span>
            {/* icon */}
            <GoTriangleDown className="text-xl" />
          </div>
        </header>
        {/* title */}
        <h1 className="my-1.5 font-medium">Create account</h1>
        {/* inputs */}
        <div>
          {/* username */}
          <div className="mb-1.5">
            <label htmlFor="username" className="text-sm text-neutral-600">
              Username
            </label>
            <div
              className={`mt-0.5 w-full border p-1 rounded-sm overflow-hidden ${
                errors.flag === "username" ?
                "border-red-500"
                :
                focus === "username" || username
                  ? "border-green-500"
                  : "border-neutral-300"
              }`}
            >
              <input
                className="w-full focus:outline-none focus:ring-0 bg-transparent border-none text-sm"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors(prev => {
                    return {
                      ...prev,
                      flag: "",
                      errors: []
                    }
                  })
                }}
                onFocus={() => {
                  setFocus("username");
                }}
                onBlur={() => {
                  setFocus("");
                }}
              />
            </div>
            {/* username error */}
            <div className={`overflow-hidden ${errors.flag === "username" ? "h-auto" : "h-0"}`}>
              <div
                className={`p-2.5 border border-red-500 rounded-sm mt-3 relative`}
              >
                {/* triangle */}
                <div className="absolute top-0 left-7 w-[16px] aspect-square border border-red-500 bg-white mt-[-8px] rotate-45 border-b-transparent border-r-transparent" />
                {errors.errors.map((item, index) => {
                  return (
                    <p
                      key={`${index}-username`}
                      className="text-sm text-red-600"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {/* email */}
          <div className="mb-1.5">
            <label htmlFor="username" className="text-sm text-neutral-600">
              Email
            </label>
            <div
              className={`mt-0.5 w-full border p-1 rounded-sm overflow-hidden ${
                errors.flag === "email" 
                ?
                "border-red-500"
                :
                focus === "email" || email
                  ? "border-green-500"
                  : "border-neutral-300"
              }`}
            >
              <input
                className="w-full focus:outline-none focus:ring-0 bg-transparent border-none text-sm"
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((prev) => {
                    return {
                      ...prev,
                      flag: "",
                      errors: [],
                    };
                  });
                }}
                onFocus={() => {
                  setFocus("email");
                }}
                onBlur={() => {
                  setFocus("");
                }}
              />
            </div>
            {/* email error */}
            <div className={`overflow-hidden ${errors.flag === "email" ? "h-auto" : "h-0"}`}>
              <div
                className={`p-2.5 border border-red-500 rounded-sm mt-3 relative`}
              >
                {/* triangle */}
                <div className="absolute top-0 left-7 w-[16px] aspect-square border border-red-500 bg-white mt-[-8px] rotate-45 border-b-transparent border-r-transparent" />
                {errors.errors.map((item, index) => {
                  return (
                    <p key={`${index}-email`} className="text-sm text-red-600">
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {/* password */}
          <div className="mb-1.5">
            <label htmlFor="username" className="text-sm text-neutral-600">
              Password
            </label>
            <div
              className={`mt-0.5 w-full border p-1 rounded-sm overflow-hidden flex items-center gap-1.5 ${
                errors.flag === "password"
                ?
                "border-red-500"
                :
                focus === "password" || password
                  ? "border-green-500"
                  : "border-neutral-300"
              }`}
            >
              <input
                className="w-full flex-1 focus:outline-none focus:ring-0 bg-transparent border-none text-sm"
                type={isPasswordHide ? "password" : "text"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => {
                    return {
                      ...prev,
                      flag: "",
                      errors: [],
                    };
                  });
                }}
                onFocus={() => {
                  setFocus("password");
                }}
                onBlur={() => {
                  setFocus("");
                }}
              />
              <button
                className={`text-lg ${
                  errors.flag === "password"
                  ?
                  "text-red-500"
                  :
                  focus === "password" || password
                    ? "text-green-500"
                    : "text-neutral-400"
                }`}
                onClick={() => {
                  setFocus("password");
                  setIsPasswordHide(!isPasswordHide);
                }}
              >
                {isPasswordHide ? <VscEyeClosed /> : <VscEye />}
              </button>
            </div>
            {/* password error */}
            <div className={`overflow-hidden ${errors.flag === "password" ? "h-auto" : "h-0"}`}>
              <div
                className={`p-2.5 border border-red-500 rounded-sm mt-3 relative`}
              >
                {/* triangle */}
                <div className="absolute top-0 left-7 w-[16px] aspect-square border border-red-500 bg-white mt-[-8px] rotate-45 border-b-transparent border-r-transparent" />
                {errors.errors.map((item, index) => {
                  return (
                    <p
                      key={`${index}-password`}
                      className="text-sm text-red-600"
                    >
                      {item}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          {/* button */}
          <div className="my-5">
            <button className="w-full py-1.5 bg-green-500 text-white rounded-sm font-medium transition-colors ease-in-out duration-150 hover:bg-green-400" onClick={()=>{
              signupFormHandler()
            }}>
              Signup
            </button>
          </div>
        </div>
        {/* social logins */}
        <div>
          <div className="flex items-center justify-center gap-x-1.5 my-10">
            <div className="w-[30%] h-[1px] bg-neutral-300" />
            <span className="text-sm text-neutral-500">Or signup with</span>
            <div className="w-[30%] h-[1px] bg-neutral-300" />
          </div>
          {/* socials */}
          <div className="my-5 flex items-center justify-evenly">
            {socialLogin.options.map((item, index) => {
              return (
                <div
                  key={item.text}
                  className="w-[20px] aspect-square rounded-full overflow-hidden cursor-pointer"
                >
                  <img
                    className="w-full h-full object-center object-cover"
                    src={item.image}
                    alt={item.text}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
