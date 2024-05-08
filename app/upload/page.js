"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db, storage } from "../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Popup from "../components/Popup";
function Upload() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [faculty, setFaculty] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [year, setYear] = useState([]);
  const [y, setY] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    const currentYear = new Date().getFullYear();
    const year = [];
    for (let i = 2018; i <= currentYear; i++) {
      year.push(i);
    }
    setYear(year);
    const fetchData = async () => {
      const dat = [];
      const collectionRef = collection(db, "View");
      await getDocs(collectionRef)
        .then((res) => {
          res.docs.forEach((doc) => {
            dat.push(doc.data());
          });
        })
        .catch((err) => {
          console.log(err);
        });
      setData(dat[0]);
      setFaculty(Object.keys(dat[0]).sort());
      setIsLoading(false);
    };
    fetchData();
  }, []);
  const [submit, setSubmit] = useState(false);
  const [department, setDepartment] = useState([]);
  const [semester, setSemester] = useState([]);
  const [f, setf] = useState("");
  const [d, setd] = useState("");
  const [s, sets] = useState("");
  const [file, setFile] = useState({ name: "", file: null });
  const [subject, setSubject] = useState("");
  const [hidden, setHidden] = useState(true);
  const [image, setImage] = useState("");
  const [p, setP] = useState("");
  const [heading, setHeading] = useState("");
  const message = [
    {
      image: "images/Popup/star.png",
      heading: "Thank you",
      p: "We have sent your file to admin to approve.",
    },
    {
      image: "images/Popup/sad.png",
      heading: "Sorry",
      p: "We are unable to upload your file. Please try again.",
    },
  ];
  const [exam, setExam] = useState();
  const e = ["Minor 1", "Minor 2", "Major"];
  const clear = () => {
    setf("");
    setd("");
    sets("");
    setSubject("");
    setFile({ name: "", file: null });
    setY("");
    setExam("");
  };
  const save = async () => {
    setSubmit(true);
    const collectionRef = collection(db, "Request");
    const date = Date.now();
    const reference = ref(storage, `files/${date}`);
    await uploadBytes(reference, file)
      .then(async (res) => {
        await getDownloadURL(reference)
          .then(async (url) => {
            const data = {
              faculty: f,
              department: d,
              semester: s,
              subject: subject,
              year: y,
              exam: exam,
              file: url,
            };
            await addDoc(collectionRef, data)
              .then(() => {
                console.log("success");
                setSubmit(false);
                setImage(message[0].image);
                setP(message[0].p);
                setHidden(false);
                setHeading(message[0].heading);
              })
              .catch((err) => {
                console.log(err.code);
                setSubmit(false);
                setImage(message[1].image);
                setP(message[1].p);
                setHidden(false);
                setHeading(message[1].heading);
              });
          })
          .catch((err) => {
            console.log(err.code);
            setSubmit(false);
            setImage(message[1].image);
            setP(message[1].p);
            setHidden(false);
            setHeading(message[1].heading);
          });
      })
      .catch((err) => {
        console.log(err.code);
        setSubmit(false);
        setImage(message[1].image);
        setP(message[1].p);
        setHidden(false);
        setHeading(message[1].heading);
      });
  };
  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save();
      }}
      className="p-12 h-screen w-screen flex flex-col place-content-center"
    >
      <Popup
        image={image}
        hidden={hidden}
        setHidden={setHidden}
        heading={heading}
        p={p}
        clear={clear}
      />
      <span className="bg-black text-white font-medium px-8 text-base rounded-xl py-2 m-auto mb-3 ">
        New Upload
      </span>
      <div className="flex flex-col place-content-center gap-2 ">
        <div className="flex place-content-center md:gap-8 gap-4 flex-col md:flex-row md:mb-3 mb-2 md:flex-wrap">
          <select
            required
            disabled={submit}
            className="md:basis-1/4 w-full h-10 px-3 border-[#B8BBC2] border-2 rounded-lg text-[#313144] text-md focus:outline-none font-medium"
            value={f}
            onChange={(e) => {
              if (e.target.value !== "") {
                if (f !== e.target.value) {
                  setf(e.target.value);
                  setDepartment(Object.keys(data[e.target.value]).sort());
                  setd("");
                  sets("");
                }
              }
            }}
          >
            <option value="">Select Faculty</option>
            {faculty.map((fac, i) => {
              return (
                <option key={i} value={fac}>
                  {fac}
                </option>
              );
            })}
          </select>
          <select
            disabled={submit}
            required
            className="md:basis-1/4 w-full h-10 px-3 border-[#B8BBC2] border-2 rounded-lg text-md focus:outline-none font-medium"
            value={d}
            onChange={(e) => {
              if (e.target.value !== "") {
                if (d !== e.target.value) {
                  setd(e.target.value);
                  setSemester(
                    Object.keys(data[f][e.target.value]).sort(
                      (a, b) =>
                        a.substring(9, a.length) - b.substring(9, b.length)
                    )
                  );
                  sets("");
                }
              }
            }}
          >
            <option value="">Select Department</option>
            {department.map((dept, i) => {
              return (
                <option key={i} value={dept}>
                  {dept}
                </option>
              );
            })}
          </select>
          <select
            required
            disabled={submit}
            className="md:basis-1/4 w-full h-10 px-3 border-[#B8BBC2] border-2 rounded-lg text-md focus:outline-none font-medium"
            value={s}
            onChange={(e) => {
              if (e.target.value !== "") {
                sets(e.target.value);
              }
            }}
          >
            <option value="">Select Semester</option>
            {semester.map((sem, i) => {
              return (
                <option key={i} value={sem}>
                  {sem}
                </option>
              );
            })}
          </select>
          <select
            required
            disabled={submit}
            className="md:basis-1/4 w-full h-10 px-3 border-[#B8BBC2] border-2 rounded-lg text-md focus:outline-none font-medium"
            value={y}
            onChange={(e) => {
              if (e.target.value !== "") {
                setY(e.target.value);
              }
            }}
          >
            <option value="">Select Year</option>
            {year.map((y, i) => {
              return (
                <option key={i} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
          <select
            required
            disabled={submit}
            className="md:basis-1/4 w-full h-10 px-3 border-[#B8BBC2] border-2 rounded-lg text-md focus:outline-none font-medium"
            value={exam}
            onChange={(e) => {
              if (e.target.value !== "") {
                setExam(e.target.value);
              }
            }}
          >
            <option value="">Select Exam Type</option>
            {e.map((ex, i) => {
              return (
                <option key={i} value={ex}>
                  {ex}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-row place-content-center">
          <input
            disabled={submit}
            required
            className="md:w-1/4 w-full h-10 px-3 border-[#B8BBC2] border-2 rounded-lg text-md focus:outline-none font-medium"
            type="text"
            value={subject}
            placeholder="Enter Subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="h-[80%] mt-6">
        <label
          className="h-full w-[70%] border-[#E2E6EA] border-2 border-dashed flex m-auto rounded-3xl place-items-center place-content-center text-[#B8BBC2] text-lg font-medium"
          htmlFor="file"
        >
          <span className="md:text-lg text-sm m-auto w-[50%] text-center">
            {file?.name === ""
              ? "Click to browse file or drag or drop your file here"
              : file?.name}
          </span>
        </label>
        <input
          required
          disabled={submit}
          hidden
          name="file"
          type="file"
          id="file"
          accept=".pdf"
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        ></input>
      </div>
      <div className="flex place-items-center place-content-center gap-4 mt-3">
        <button
          disabled={submit}
          className="rounded-md px-6 py-2 text-[#5D5FEF] border-[#5D5FEF] border-2"
          onClick={clear}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submit}
          className="rounded-md px-6 py-2 bg-[#5D5FEF] text-white border-[#5D5FEF] border-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default Upload;
