import React, {  } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LoginUser from "./pages/loginPage/loginPage";
import HomePage from "./pages/homePage/homePage";
import SettingAccount from "./pages/settingPages/settingAccount";
import SettingProfile from "./pages/settingPages/settingProfile";
import MyParcelList from './pages/parcelList/myParcelList';
import PinkUpParcelList from './pages/pinkUpParcel/pinkUpParcelList';
import CreatePinkUpParcelList from "./pages/pinkUpParcel/createPUPL/createPinkUpParcelList";
import ParcelTypeAndUnti from "./pages/parcelTypeAndUnti/parcelTypesAndUnit";




const App: React.FC = () => {

  return (
    <Router>
            <Routes>

              <Route path="/" element={<LoginUser/>} />
              <Route path="/pages/parcelTypesAndUnit" element={<ParcelTypeAndUnti />} />
              <Route path="/pages/myParcelList" element={<MyParcelList />} />
              <Route path="/pages/pinkUpParcelList" element={<PinkUpParcelList />} />
              <Route path="/pages//createPUPL/createPinkUpParcelList" element={<CreatePinkUpParcelList />} />
              <Route path="/pages/homePage" element={<HomePage />} />
              <Route path="/pages/settingAccount" element={<SettingAccount />} />
              <Route path="/pages/settingProfile" element={<SettingProfile />} />

            </Routes>
    </Router>
  );
};

export default App;
