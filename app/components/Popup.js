const Popup = ({ heading, image, p, hidden, setHidden, clear }) => {
  return (
    <div
      style={{ display: hidden ? "none" : "flex" }}
      className="fixed top-0 bottom-0 left-0 right-0 justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div className="bg-white flex flex-col rounded-lg w-[40%] p-5 place-content-center">
        <button
          type="button"
          className="font-bold rounded-full border-black text-black border-2 ml-auto w-8 h-8 text-center"
          onClick={() => {
            clear();
            setHidden(true);
          }}
        >
          X
        </button>
        <div className="justify-center items-center flex place-content-center flex-col">
          <h1 className="text-xl font-bold mb-4 text-center">{heading}</h1>
          <img src={image}></img>
          <p className="text-center">{p}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
