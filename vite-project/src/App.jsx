import React from "react";
import StockForm from "./components/StockForm";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const App = () => {
  return (
    <div className=" w-full h-full bg-[#f0f0f0fb]">
      <header>
        <nav className=" w-full h-16 flex justify-end p-5  bg-white shadow-lg">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      <div>
        <div>
          <StockForm />
        </div>
      </div>
    </div>
  );
};

export default App;
