import { Button } from "flowbite-react";
import Sidebarmenu from "./Sidebar";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import Userlist from "./Userlist";
import Usercreate from "./Usercreate";
import { BrowserRouter, Route, Routes } from "react-router";
import Useredit from "./Useredit";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/user-list" element={<Userlist/>}/>
        <Route path="/user-create" element={<Usercreate/>}/>
        <Route path="/user-edit/:id" element={<Useredit/>}/>
      </Routes>

      {/* <Dashboard/> */}
      {/* <Userlist/> */}
      {/* <Usercreate/> */}
      </BrowserRouter>
    </>
  );
}

export default App;
