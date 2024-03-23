import { useState } from "react";
import HeaderComp from "./components/HeaderComp";
import HomeComp from "./components/HomeComp";
import AdminComp from "./components/AdminComp";
import BusList from "./components/BusList";
import AddBus from "./components/AddBus";
import PassengerList from "./components/PassengerList";
import UpdateBus from "./components/UpdateBus";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import UpdatePassenger from "./components/UpdatePassenger";
import AboutUs from "./components/AboutUs";
import LoginComponent from "./components/LoginComponent";
import RegistredComponent from "./components/RegistredComponent";
import { isUserLoggedIn } from "./service/AuthService";
import UserComponents from "./components/UserComponents";
import BookingNow from "./components/BookingNow";
import ChangePassword from "./components/ChangePassword";
import SeatPicker from "./components/SeatPicker";
import Eticket from "./components/Eticket";
import ViewComponent from "./components/ViewComponent";
import MyBooking from "./components/MyBooking";


function App() {
  const [count, setCount] = useState(0);
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComp />
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route
            path="/admin"
            element={
              <AuthenticatedRoute>
                <AdminComp />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/busList"
            element={
              <AuthenticatedRoute>
                <BusList />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/addbus"
            element={
              <AuthenticatedRoute>
                <AddBus />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/PassengerList"
            element={
              <AuthenticatedRoute>
                <PassengerList />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/updatebus/:id"
            element={
              <AuthenticatedRoute>
                <UpdateBus />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/updatePassenger/:id"
            element={
              <AuthenticatedRoute>
                <UpdatePassenger />
              </AuthenticatedRoute>
            }
            
          ></Route>
          <Route
            path="/user"
            element={
              <AuthenticatedRoute>
                <UserComponents />
              </AuthenticatedRoute>
            }
            
          ></Route>
          <Route
            path="/bookNow/:id"
            element={
              <AuthenticatedRoute>
                <BookingNow />
              </AuthenticatedRoute>
            }
            
          ></Route>
          <Route
            path="/changePassword"
            element={
              <AuthenticatedRoute>
                <ChangePassword />
              </AuthenticatedRoute>
            }
            
          ></Route>
          <Route path="/SeatPicker/:id" element={<SeatPicker/>}></Route>
          <Route path="/AboutUs" element={<AboutUs />}></Route>
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/register" element={<RegistredComponent />}></Route>
          <Route path="/eticket" element={<Eticket />}></Route>
          <Route path="/eticket" element={<Eticket />}></Route>
          <Route path="/view/:id" element={<ViewComponent/>}></Route>
          <Route path="/myBookings" element={<MyBooking/>}></Route>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

