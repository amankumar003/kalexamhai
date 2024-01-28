"use client"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { getRequestPaper } from "../redux/features/request/requestSlice";
import { db } from "../firebase/firebase-config";
import { Link } from "next/link";
import { HashLoader } from "react-spinners";


const Admin = () => {

    const dispatch = useDispatch();
    const { requestPaper, isLoading } = useSelector((state) => state.request);
    useEffect(() => {
        dispatch(getRequestPaper());
    }, []);
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false);
    // Getting the state from the login page
    const { isLogin } = useSelector((state) => state.login);
    const reject = async (id) => {
        setIsDisabled(true);
        const docu = await doc(db, "request", id);
        const docRef = deleteDoc(docu)
            .then(() => {
                setIsDisabled(false);
                dispatch(getRequestPaper());
            })
            .catch((err) => {
                setIsDisabled(false);
                console.log(err);
            });
    };
    const accept = async (object) => {
        setIsDisabled(true);
        const collectionRef = collection(db, "view");
        //   Assuming the data is stored in this form in the table
        const data = {
            deptname: object.deptname,
            year: object.year,
            semester: object.semester,
            subject: object.subject,
            exam: object.exam,
            file: object.file,
        };
        await addDoc(collectionRef, data)
            .then(() => {
                // Display an alert when the file is accepted
                window.alert('File accepted successfully!');
                setIsDisabled(false);
                // Remove the accepted file from the requests
                reject(object.id);
            })
            .catch((err) => {
                console.log(err);
                setIsDisabled(false);
            });
    };

    // redirecting to the login page , if the admin is not logged in. (Create separate route for the login while connecting )
    if (!isLogin) {
      router.push("/login");
    }

    return (
        <div>
            {isLoading ? (
                // Loader component , adjust it according to the page , refer to npm react-spinners for documentation
                <HashLoader color={'#5BD1D7'} loading={loading} className=" justify-center"  size={50}  />
                
            ) : (
                requestPaper.map((p, i) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-row items-center gap-8 p-6 border-[#eee] border-[1px] shadow-xl shadow-[0px 4px 8px #b4b4b4]"
                        >
                            <span className="text-lg font-semibold">{p.deptname}</span>
                            <span className="text-lg font-semibold">{p.year}</span>
                            <span className="text-lg font-semibold">{p.semester}</span>
                            <span className="text-lg font-semibold">{p.subject}</span>
                            <span className="text-lg font-semibold">{p.exam}</span>
                            <button
                                onClick={() => {
                                    const param = new URLSearchParams();
                                    param.set("url", p.file);
                                    router.push("/preview?" + param.toString());
                                }}
                                disabled={isDisabled}
                                className="bg-stone-400 hover:bg-white hover:text-stone-500  text-white rounded-md font-bold py-2 px-3"
                            >
                                Preview
                            </button>
                            <button
                                onClick={() => {
                                    reject(p.id);
                                }}
                                disabled={isDisabled}
                                className="bg-red-600 hover:bg-white hover:text-red-600 text-white rounded-md font-bold py-2 px-3"
                            >
                                Reject
                            </button>
                            <button
                                disabled={isDisabled}
                                onClick={() => {
                                    accept(p);
                                }}
                                className="bg-green-500 hover:bg-white hover:text-green-500  text-white rounded-md font-bold py-2 px-3"
                            >
                                Accept
                            </button>
                        </div>
                    );
                })
            )}

        </div>
    )
}

export default Admin
