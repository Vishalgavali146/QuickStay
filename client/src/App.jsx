import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import HotelReg from "./components/HotelReg";
import LayOut from "./pages/hotelOwner/LayOut";
import DashBoard from "./pages/hotelOwner/DashBoard";
import AddRoom from "./pages/hotelOwner/AddRoom";
import ListRoom from "./pages/hotelOwner/ListRoom";
import MyBookings from "./pages/MyBookings";


const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");
  return (
    <div>
      {!isOwnerPath && <Navbar />}
       {false && <HotelReg />}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/rooms" element={<AllRooms/>}/>
          <Route path="/my-bookings" element={<MyBookings/>}/>
          <Route  path="/rooms/:id" element={<RoomDetails />}/>
          <Route path ='/owner' element={<LayOut />}>
                  <Route index element = {<DashBoard />}/>
                  <Route path = "add-room" element = {<AddRoom />} />
                  <Route path = "list-room" element = {<ListRoom />} />
          </Route>
        </Routes>

      </div>
      <Footer />
    </div>
  )
  }

export default App;