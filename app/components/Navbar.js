"use client";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase-config";
import { logout } from "../redux/features/Login/loginSlice";
const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.login);
  return (
    <div className="flex flex-row px-10 py-5 justify-between border-b-2 border-[#ccc]  shadow-[0px_2px_4px_rgb(180,180,180)]">
      <button
        className="flex flex-row"
        onClick={() => {
          router.push("/");
        }}
      >
        <img src="images/logo.png" className="w-10 h-11" alt="logo.png"></img>
        <h1 className="text-lg py-2 font-semibold">KAL EXAM HAI</h1>
      </button>
      <div className="flex flex-row gap-2">
        {isLogin ? (
          <button
            onClick={() => {
              signOut(auth)
                .then((res) => {
                  dispatch(logout());
                })
                .catch((err) => {
                  console.log(err.code);
                });
            }}
            className="w-32 h-11 text-lg border-[#5D5FEF] border-2 text-[#5D5FEF] rounded py-1 px-6"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className="w-32 h-11 text-lg border-[#5D5FEF] border-2 text-[#5D5FEF] rounded py-1 px-6"
          >
            SignUp
          </button>
        )}
        <button
          onClick={() => {
            router.push("/upload");
          }}
          className="w-32 h-11 text-lg bg-[#5D5FEF] border-2 border-[#5D5FEF] text-white rounded py-1 px-6"
        >
          Upload
        </button>
      </div>
    </div>
  );
};
export default Navbar;
