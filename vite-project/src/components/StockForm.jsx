import React, { useEffect, useState } from "react";
import axios from "axios";

const StockForm = () => {
  const [stock, setStock] = useState({
    scripname: "",
    cmp: "",
    entry: "",
    stoploss: "",
    target: "",
  });

  const [added, setAdded] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        // Fetch stocks data from the backend API
        const response = await axios.get("http://localhost:5000/api/stocks");
        setAdded(response.data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend API
      await axios.post("http://localhost:5000/api/stocks", stock);

      // Update local state and local storage after a successful request
      const updatedAdded = [...added, stock];
      setAdded(updatedAdded);
      // Clear form fields after successful submission
      setStock({
        scripname: "",
        cmp: "",
        entry: "",
        stoploss: "",
        target: "",
      });
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };
  const handleRemove = async (index) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/stocks/${added[index]._id}`);
      console.log(response.data);
      const updatedStocks = [...added];
      updatedStocks.splice(index, 1);
      setAdded(updatedStocks);
    } catch (error) {
      console.error("Error removing stock:", error);
    }
  };
  
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full h-full">
        <div className="flex flex-col p-16 w-full h-full items-center">
          <div className="lg:w-1/4 md:w-2/3 sm:w-[500px] h-auto lg:h-550 md:h-auto sm:h-auto rounded-lg bg-white text-black flex flex-col shadow-lg items-center">
            <div className="flex flex-col w-40 h-20 gap-3 items-center mt-5">
              <label htmlFor="scripname">ScripName</label>
              <input
                type="text"
                onChange={handleInput}
                autoComplete="off"
                value={stock.scripname}
                name="scripname"
                className="rounded-md border-black text-black border"
              />
            </div>
            <div className="flex flex-col w-40 h-20 gap-3 items-center">
              <label htmlFor="cpm">CMP</label>
              <input
                type="number"
                autoComplete="off"
                value={stock.cmp}
                onChange={handleInput}
                name="cmp"
                className="rounded-md border-black border"
              />
            </div>
            <div className="flex flex-col w-40 h-20 gap-3 items-center">
              <label htmlFor="entry">Entry</label>
              <input
                type="number"
                autoComplete="off"
                value={stock.entry}
                onChange={handleInput}
                name="entry"
                className="rounded-md border-black border"
              />
            </div>
            <div className="flex flex-col w-40 h-20 gap-3 items-center">
              <label htmlFor="stoploss">SL</label>
              <input
                type="number"
                autoComplete="off"
                value={stock.stoploss}
                onChange={handleInput}
                name="stoploss"
                className="rounded-md border-black border"
              />
            </div>
            <div className="flex flex-col w-40 h-20 gap-3 items-center">
              <label htmlFor="target">Target</label>
              <input
                type="number"
                autoComplete="off"
                value={stock.target}
                onChange={handleInput}
                name="target"
                className="rounded-md border-black border"
              />
            </div>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 duration-300 rounded-md mb-5 text-[#fff0f0] font-semibold mt-5 text-sm py-3 px-5"
            >
              Add Stock
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center overflow-auto">
        {added.map((item, index) => (
          <div
            key={index}
            className="w-[80%] h-20 bg-[#ffffff] rounded-lg shadow-lg mb-5"
          >
            <div className="flex justify-center">
              <div className="w-[90%] flex justify-between mt-4">
                <span className="flex flex-col items-center">
                  <label className="text-sm font-semibold" htmlFor="scripname">
                    SCRIP
                  </label>
                  <h1 className="text-sm px-10 py-1 border border-black rounded-lg mt-1">
                    {item.scripname}
                  </h1>
                </span>
                <span className="flex flex-col items-center">
                  <label className="text-sm font-semibold" htmlFor="scripname">
                    CMP
                  </label>
                  <h1 className="text-sm font-semibold px-10 py-1 border border-black rounded-lg mt-1">
                    {item.cmp}
                  </h1>
                </span>
                <span className="flex flex-col items-center">
                  <label className="text-sm font-semibold" htmlFor="scripname">
                    ENTRY
                  </label>
                  <h1 className="text-sm text-blue-700 font-semibold px-10 py-1 border border-black rounded-lg mt-1">
                    {item.entry}
                  </h1>
                </span>
                <span className="flex flex-col items-center">
                  <label className="text-sm font-semibold" htmlFor="scripname">
                    STOPLOSS
                  </label>
                  <h1 className="text-sm text-red-500 font-semibold px-10 py-1 border border-black rounded-lg mt-1">
                    {item.stoploss}
                  </h1>
                </span>

                <span className="flex flex-col items-center">
                  <label className="text-sm font-semibold" htmlFor="scripname">
                    TGT
                  </label>
                  <h1 className="text-sm text-teal-600 font-semibold px-10 py-1 border border-black rounded-lg mt-1">
                    {item.target}
                  </h1>
                </span>
                <span>
                  <button
                    type="button"
                    onClick={() => handleRemove(index)}
                    className="px-5 text-sm py-2 rounded-lg mt-2 text-white hover:bg-[#A52A2A] bg-[#EE4B2B] duration-300"
                  >
                    Remove
                  </button>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StockForm;
