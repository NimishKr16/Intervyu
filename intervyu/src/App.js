import React from "react";
import Sidebar from "./components/Sidebar";
import { DefaultSidebar } from "./components/anotherbar";
import { MaterialTailwindProvider } from "@material-tailwind/react";

function App() {
  return (
    <>
    {/* <MaterialTailwindProvider> */}

      <Sidebar />
      <DefaultSidebar />
    {/* </MaterialTailwindProvider> */}
    </>

  );
}

export default App;