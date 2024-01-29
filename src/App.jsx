import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [length, setLength] = useState(12);
  const [number, setNumber] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("Default-Password");

  const passwordRef = useRef(null);

  console.log(length, number, special, password);

  // generate random password
  const generatePassword = () => {
    console.log("Inside generate password");
    let newPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      let numbers = "0123456789";
      str += numbers;
    }
    if (special) {
      let specialCharacters = "!@#$%^&*(){}[]_";
      str += specialCharacters;
    }

    for (let i = 1; i <= length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      newPassword += str.charAt(idx);
    }

    console.log("New password is", newPassword);
    setPassword(newPassword);
  };

  // copyToClipboard
  const copyToClipboard = () => {
    // These two will show the select ui
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);

    window.navigator.clipboard.writeText(password); // it will copy the password
  };

  useEffect(() => {
    console.log("Inside use effect");
    generatePassword();
  }, [length, number, special]);

  return (
    <div className=" h-screen w-full bg-slate-800 text-white ">
      <div className="flex h-full flex-col items-center justify-center">
        <div>
          <input
            type="text"
            className="cursor-not-allowed border-none px-4 py-2 text-black outline-none"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-400 p-2 hover:bg-blue-500"
          >
            Copy
          </button>
        </div>
        <div className="mt-2 flex">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <div className="ml-4 flex">
            <h2>length({length})</h2>
          </div>
          <div className="ml-4 flex gap-1">
            <input
              type="checkbox"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label>Number</label>
          </div>
          <div className="ml-4 flex gap-1">
            <input
              type="checkbox"
              onChange={() => setSpecial((prev) => !prev)}
            />
            <label>Special </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
