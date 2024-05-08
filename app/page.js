"use client";
import cardList_semester from "./data/data_semester";
import CardComponent from "./components/cardsVk092";
import cardList_department from "./data/data_department";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { auth, db } from "./firebase/firebase-config";
import { useEffect, useState } from "react";
import { login } from "./redux/features/Login/loginSlice";
import { useDispatch } from "react-redux";
import Cards from "./components/Cards";
import { fetchData } from "./redux/features/Data/datasSlice";
import Card from "./components/Cards";
import { addDoc, collection } from "firebase/firestore";
import dataUpload from "./data";
import Paper from "./components/Paper";
import { useRouter } from "next/navigation";
export default function Home() {
  const { isLogin } = useSelector((state) => state.login);
  const [isHidden, setIsHidden] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state) => state.data);
  const [faculty, setFaculty] = useState();
  const [branch, setBranch] = useState("");
  const [path, setPath] = useState("");
  const [semester, setSemester] = useState(false);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login());
      }
    });
  }, []);
  const p = path.split("/");
  // useEffect(() => {
  //   const upload = async () => {
  //     await addDoc(collection(db, "View"), dataUpload).then(() => {
  //       console.log("Upload");
  //     });
  //   };
  //   upload();
  // }, []);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  useEffect(() => {
    if (data) {
      setFaculty(data[0] && Object.keys(data[0]).sort());
    }
  }, [data]);
  const [search, setSearch] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) {
      router.push("/signup");
    }
  }, [isLogin]);
  return (
    <div>
      <Navbar />
      <img
        className="m-auto w-[100%] h-[100%] px-10 py-6"
        src="images/Banner/Banner-1.png"
        alt="Banner-1.png"
      ></img>
      <div className="flex flex-row px-9 py-0 gap-8 ">
        <div className="flex flex-col px-4 py-3 gap-2 border-black border-2 rounded-lg font-bold max-h-11">
          <div className="flex flex-row w-20 place-items-center h-7 px-1 pb-3 pt-0 gap-3 ">
            <img
              src="images/filter/filter.png"
              className="w-5 h-5"
              alt="filter.png"
            ></img>
            <button
              className="text-lg"
              onClick={() => {
                setIsHidden(!isHidden);
              }}
            >
              Filter
            </button>
          </div>
          {isHidden && (
            <div className="flex flex-col md:w-[300px] sm:w-[150px]">
              <button
                className="gap-3 bg-blue-100 flex hover:bg-blue-50 text-blue-600 font-semibold py-2 text-sm px-4 rounded mt-6"
                onClick={() => {
                  setPath(
                    "Faculty of Engineering/Computer Science and Engineering"
                  );
                  setBranch("Faculty of Engineering");
                  setFaculty(
                    data[0]["Faculty of Engineering"][
                      "Computer Science and Engineering"
                    ] &&
                      Object.keys(
                        data[0]["Faculty of Engineering"][
                          "Computer Science and Engineering"
                        ]
                      ).sort()
                  );
                  setSemester((prevValue) => {
                    if (prevValue == true) return false;
                  });
                }}
              >
                <img src="images/filter/pen.png" className=" w-7 h-7"></img>
                <div className="my-auto">Computer Science</div>
              </button>
              <button
                className="gap-3 bg-blue-100 flex hover:bg-blue-50 text-blue-600 font-semibold py-2 text-sm px-4 rounded mt-4 "
                onClick={() => {
                  setPath(
                    "Faculty of Engineering/Electronics and Communication"
                  );
                  setBranch("Faculty of Engineering");
                  setFaculty(
                    data[0]["Faculty of Engineering"][
                      "Electronics and Communication Engineering"
                    ] &&
                      Object.keys(
                        data[0]["Faculty of Engineering"][
                          "Electronics and Communication Engineering"
                        ]
                      ).sort()
                  );
                  setSemester((prevValue) => {
                    if (prevValue == true) return false;
                  });
                }}
              >
                <img src="images/filter/pen.png" className=" w-7 h-7"></img>
                <div className="my-auto">Electronics and Communication</div>
              </button>
              <button
                className="gap-3 bg-blue-100 flex hover:bg-blue-50 text-blue-600 font-semibold py-2 text-sm px-4 rounded mt-4 "
                onClick={() => {
                  setPath("Faculty of Engineering/Mechanical Engineering");
                  setBranch("Faculty of Engineering");
                  setFaculty(
                    data[0]["Faculty of Engineering"][
                      "Mechanical Engineering"
                    ] &&
                      Object.keys(
                        data[0]["Faculty of Engineering"][
                          "Mechanical Engineering"
                        ]
                      ).sort()
                  );
                  setSemester((prevValue) => {
                    if (prevValue == true) return false;
                  });
                }}
              >
                <img src="images/filter/pen.png" className=" w-7 h-7"></img>
                <div className="my-auto">Mechanical Engineering</div>
              </button>
              <button
                className="gap-3 bg-blue-100 flex hover:bg-blue-50 text-blue-600 font-semibold py-2 text-sm px-4 rounded mt-4 "
                onClick={() => {
                  setPath("Faculty of Engineering/Electrical Engineering");
                  setBranch("Faculty of Engineering");
                  setFaculty(
                    data[0]["Faculty of Engineering"][
                      "Electrical Engineering"
                    ] &&
                      Object.keys(
                        data[0]["Faculty of Engineering"][
                          "Electrical Engineering"
                        ]
                      ).sort()
                  );
                  setSemester((prevValue) => {
                    if (prevValue == true) return false;
                  });
                }}
              >
                <img src="images/filter/pen.png" className=" w-7 h-7"></img>
                <div className="my-auto">Electrical Engineering</div>
              </button>
              <button
                className=" gap-3 bg-blue-100 flex hover:bg-blue-50 text-blue-600 font-semibold py-2 text-sm px-4 rounded mt-4 "
                onClick={() => {
                  setPath("Faculty of Engineering/Civil Engineering");
                  setBranch("Faculty of Engineering");
                  setFaculty(
                    data[0]["Faculty of Engineering"]["Civil Engineering"] &&
                      Object.keys(
                        data[0]["Faculty of Engineering"]["Civil Engineering"]
                      ).sort()
                  );
                  setSemester((prevValue) => {
                    if (prevValue == true) return false;
                  });
                }}
              >
                <img src="images/filter/pen.png" className=" w-7 h-7"></img>
                <div className="my-auto">Civil Engineering</div>
              </button>
              <button
                className="gap-3 bg-blue-100 flex hover:bg-blue-50 text-blue-600 font-semibold py-2 text-sm px-4 rounded mt-4 "
                onClick={() => {
                  setPath("Faculty of Management");
                  setBranch("Faculty of Management");
                  setFaculty(
                    data[0]["Faculty of Management"] &&
                      Object.keys(data[0]["Faculty of Management"]).sort()
                  );
                  setSemester((prevValue) => {
                    if (prevValue == true) return false;
                  });
                }}
              >
                <img src="images/filter/pen.png" className=" w-7 h-7"></img>
                <div className="my-auto">Management</div>
              </button>
            </div>
          )}
        </div>

        <div className="w-[100%]">
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="Search your branch here..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-[100%] rounded-l-lg px-4 py-2 focus:outline-none border-black border-2 border-r-0"
            ></input>
            <button
              onClick={() => {
                let s = search.split(" ");
                for (let i = 0; i < s.length; i++) {
                  if (s[i].toLowerCase() === "of") {
                    s[i] = "of";
                  } else if (s[i].toLowerCase() === "and") {
                    s[i] = "and";
                  } else {
                    s[i] = s[i].charAt(0).toUpperCase() + s[i].slice(1);
                  }
                }
                s = s.join(" ");
                console.log(s);
                if (data[0]["Faculty of Engineering"][s] !== undefined) {
                  setPath("Faculty of Engineering/" + s);
                  setBranch("Faculty of Engineering");
                  setFaculty(
                    data[0]["Faculty of Engineering"][s] &&
                      Object.keys(data[0]["Faculty of Engineering"][s]).sort()
                  );
                } else if (data[0]["Faculty of Management"][s]) {
                  setPath("Faculty of Management/" + s);
                  setBranch("Faculty of Management");
                  setFaculty(
                    data[0]["Faculty of Management"][s] &&
                      Object.keys(data[0]["Faculty of Management"][s]).sort()
                  );
                } else if (data[0]["Faculty of Science"][s]) {
                  setPath("Faculty of Science/" + s);
                  setBranch("Faculty of Science");
                  setFaculty(
                    data[0]["Faculty of Science"][s] &&
                      Object.keys(data[0]["Faculty of Science"][s]).sort()
                  );
                }
              }}
              className="bg-[#4470E2] border-2 border-[#4470E2] w-12 rounded-r-lg"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-white m-auto" />
            </button>
          </div>

          {/* <div className="grid md:grid-cols-3 sm:grid-rows-1 mt-5 gap-20">
              <Cards title="FACULTY OF ENGINEERING" img="images/cards/engineering.png" link="/"/>
              <Cards title="FACULTY OF SCIENCES" img="images/cards/sciences.png" link="/"/>
              <Cards title="FACULTY OF MANAGEMENT" img="images/cards/management.png" link="/"/>
              <Cards title="FACULTY OF HUMANITIES" img="images/cards/humanities.png" link="/"/>
          </div> */}

          {/* new cards  */}
          {/* <div className="cardsVk092">
            <CardComponent cardList={cardList_department} />
          </div>

          <div className="cardsVk092">
            <CardComponent cardList={cardList_semester} />
          </div> */}
          <div className="m-8 flex flex-wrap flex-row gap-12">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : !semester ? (
              faculty && (
                <div className="flex flex-row flex-wrap gap-6">
                  <h1 className="basis-full text-2xl font-semibold">
                    {path ? (
                      <>
                        <button
                          onClick={() => {
                            if (path.includes("/")) {
                              const arr = path.split("/");
                              setPath(arr[0]);
                              setBranch(arr[0]);
                              setFaculty(
                                data[0][arr[0]] &&
                                  Object.keys(data[0][arr[0]]).sort()
                              );
                            } else {
                              setPath("");
                              setBranch("");
                              // setFaculty(data[0][path]);
                              setFaculty(
                                data[0] && Object.keys(data[0]).sort()
                              );
                            }
                          }}
                        >
                          &#60;
                        </button>{" "}
                        {path}
                      </>
                    ) : (
                      ""
                    )}
                  </h1>
                  <div className="flex flex-row flex flex-wrap gap-12">
                    {faculty.map((item, i) => {
                      const p = path.split("/");
                      console.log(p);
                      if (branch !== undefined) {
                        console.log(data[0][branch]);
                      }
                      return (
                        <Card
                          img={"images/cards/" + item + ".png"}
                          setFaculty={setFaculty}
                          semester={semester}
                          setSemester={setSemester}
                          title={item}
                          data={data}
                          path={path}
                          obj={
                            data[0][item] !== undefined
                              ? data[0][item]
                              : branch !== "" && data[0][branch] !== undefined
                              ? data[0][branch][item]
                              : ""
                          }
                          branch={branch}
                          setBranch={setBranch}
                          key={i}
                          setPath={setPath}
                        ></Card>
                      );
                    })}
                  </div>
                </div>
              )
            ) : (
              <div className="flex flex-row flex-wrap gap-6">
                <h1 className="basis-full text-2xl font-semibold">
                  {path ? (
                    <>
                      <button
                        onClick={() => {
                          setSemester(false);
                          if (path.includes("/")) {
                            const arr = path.split("/");
                            setPath(arr[0] + "/" + arr[1]);
                            setBranch(arr[0]);
                            setFaculty(
                              data[0][arr[0]] &&
                                Object.keys(data[0][arr[0]][arr[1]]).sort()
                            );
                          } else {
                            setPath("");
                            setBranch("");
                            // setFaculty(data[0][path]);
                            setFaculty(data[0] && Object.keys(data[0]).sort());
                          }
                        }}
                      >
                        &#60;
                      </button>{" "}
                      {path}
                    </>
                  ) : (
                    ""
                  )}
                </h1>
                {faculty.length === 0 && (
                  <h1 className="text-3xl max-w-full font-normal mx-auto text-center">
                    No,papers to display...
                  </h1>
                )}
                <div className="flex flex-row flex-wrap gap-12">
                  {faculty.map((item, i) => {
                    const p = path.split("/");
                    console.log(p);
                    console.log(data[0][p[0]][p[1]]);
                    return (
                      <Paper key={i} obj={data[0][p[0]][p[1]][[p[2]]][i]} />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
