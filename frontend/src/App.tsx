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
import ParcelOverview from "./pages/parcelOverview/parcelOverview";
import EditPinkUpParcelList from "./pages/pinkUpParcel/editPUPL/editPUPL";

import CreateParcelListPage from "./pages/parcelList/createParcelList/createParcelList";
import DetailParcelList from "./pages/parcelList/detailParcelList/detailParcelList";
import EditParcelList from "./pages/parcelList/editParcelList/editParcelList";
import ImprotParcelList from "./pages/parcelList/importParcelList/importParcelList";




const App: React.FC = () => {

  return (
    <Router>
            <Routes>

              <Route path="/" element={<LoginUser/>} />
              <Route path="/pages/parcelOverview" element={<ParcelOverview />} />

              <Route path="/pages/myParcelList" element={<MyParcelList />} />
              <Route path="/pages/myParcelList/createParcelList" element={<CreateParcelListPage />} />
              <Route path="/pages/myParcelList/detailParcelList" element={<DetailParcelList />} />

              
              <Route path="/pages/myParcelList/editParcelList/:id" element={<EditParcelList />} />

              <Route path="/pages/myParcelList/importParcelList" element={<ImprotParcelList />} />


              <Route path="/pages/pinkUpParcelList" element={<PinkUpParcelList />} />
              <Route path="/pages/pinkUpParcelList/createPinkUpParcelList" element={<CreatePinkUpParcelList />} />
              <Route path="/pages/pinkUpParcel/editPUPL" element={<EditPinkUpParcelList />} />

              <Route path="/pages/homePage" element={<HomePage />} />

              <Route path="/pages/settingAccount" element={<SettingAccount />} />
              <Route path="/pages/settingProfile" element={<SettingProfile />} />

            </Routes>
    </Router>
  );
};

export default App;
