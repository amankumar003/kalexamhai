"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/Login/loginSlice";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [match, setMatch] = useState(true);
  const [isSelect, setIsSelect] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  // User login
  const submit = async () => {
    setIsSubmitted(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsSubmitted(false);
        dispatch(login());
        router.push("/");
      })
      .catch((err) => {
        console.log(err.code);
        setError(true);
        setIsSubmitted(false);
        setMessage(err.message);
      });
  };
  // Admin login
  const adminLogin = async () => {
    setIsSubmitted(true);
    // const adminPassword ="admin"
    await signInWithEmailAndPassword(
      auth,
      "kalexamhai1@gmail.com",
      adminPassword
    )
      .then((res) => {
        dispatch(login());
        router.push("/admin");
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
        setIsSubmitted(false);
      });
  };
  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col gap-4 border-2 border-[#ccc] shadow-[0px_4px_8px_rgb(180,180,180)] rounded-3xl p-10">
        <div className="flex flex-col gap-2 place-content-start">
          <h1 className="font-semibold text-4xl">SignUp</h1>
        </div>
        <div className="flex flex-row place-content-center bg-[#EEEEEE] m-auto rounded-full ">
          <button
            onClick={() => {
              isSelect === false && setIsSelect(true);
            }}
            className={`text-md  font-semibold text-[#2E2E2E] px-8 py-2 rounded-full ${
              isSelect
                ? " text-[#EEEEEE] bg-[#2E2E2E] border-2"
                : "bg-[#EEEEEE]"
            }`}
          >
            As a student
          </button>
          <button
            onClick={() => {
              isSelect === true && setIsSelect(false);
            }}
            className={`text-md font-semibold  text-[#2E2E2E] px-8 py-2 rounded-full ${
              !isSelect
                ? " text-[#EEEEEE] bg-[#2E2E2E] border-2"
                : "bg-[#EEEEEE]"
            }`}
          >
            As an admin
          </button>
        </div>
        {isSelect ? (
          <>
            <form
              className="flex flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <input
                type="email"
                disabled={isSubmitted}
                className="focus:outline-none border-[#ccc] border-2 rounded-xl md:w-[30vw] md:h-16 shadow-[0px_2px_8px_rgb(180,180,180)] px-4 py-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></input>
              <input
                type="password"
                disabled={isSubmitted}
                className="focus:outline-none border-[#ccc] border-2 rounded-xl md:w-[30vw] md:h-16 shadow-[0px_2px_8px_rgb(180,180,180)] px-4 py-3"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length >= 8) {
                    setIsHidden(false);
                  } else {
                    setIsHidden(true);
                  }
                }}
                value={password}
                required
              ></input>
              {isHidden && (
                <p className="text-red-500">
                  Password should be atleast 8 characters long
                </p>
              )}
              <input
                type="password"
                disabled={isSubmitted}
                className="focus:outline-none border-[#ccc] border-2 rounded-xl md:w-[30vw] md:h-16 shadow-[0px_2px_8px_rgb(180,180,180)] px-4 py-3"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  const a = e.target.value;
                  if (a.length > 0 && a != password.slice(0, a.length))
                    setMatch(false);
                  else setMatch(true);
                }}
                required
              ></input>
              {!match && (
                <p className="text-red-500">
                  Password and Confirm Password don&apos;t match
                </p>
              )}
              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  disabled={isSubmitted}
                  className="w-4 accent-[#0016DF]"
                  required
                ></input>
                <label className="text-md text-[#333333]">
                  I agree to the Terms and Conditions
                </label>
              </div>
              <button
                type="submit"
                className="md:w-[30vw] md:h-16 text-white rounded-xl px-4 py-3 bg-[#0016DF]"
                disabled={!match || isSubmitted}
              >
                Continue
              </button>
              {error && <p className="text-red-500">{message}</p>}
            </form>
            <div className="flex place-content-center">
              <h3>
                Already registered?
                <a
                  className="font-semibold"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login
                </a>
              </h3>
            </div>
          </>
        ) : (
          <form
            className="flex flex-col gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              adminLogin();
            }}
          >
            <input
              value={adminPassword}
              onChange={(e) => {
                setAdminPassword(e.target.value);
              }}
              placeholder="Enter admin password"
              className="focus:outline-none border-[#ccc] border-2 rounded-xl md:w-[30vw] md:h-16 shadow-[0px_2px_8px_rgb(180,180,180)] px-4 py-3"
            ></input>
            <button
              type="submit"
              className="md:w-[30vw] md:h-16 text-white rounded-xl px-4 py-3 bg-[#0016DF]"
              disabled={isSubmitted}
            >
              Admin login
            </button>
            {error && <p className="text-red-500">{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
