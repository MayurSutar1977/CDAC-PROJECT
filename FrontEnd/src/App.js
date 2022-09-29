import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./Components/Footer";
import About from "./Common/Pages/About";
import Contact from "./Common/Pages/Contact";
import LoginPage from "./Common/LoginPage"
import Home from "./Common/Pages/Home"
import UserProfile from "./CustomerScreen/UserProfile"
import ViewProfile from "./CustomerScreen/ViewProfile"
import UserRegister from "./Dups/UserRegistration1"
import Example from "./CustomerScreen/Example"
import FileUpload from "./CustomerScreen/FileUpload"
import SignUpPage from "./CustomerScreen/SignUpPage"
import HomePage from "./Admin/HomePage";
import EquipmentsUnderCategoryPage from './Admin/AdminPages/EquipmentsUnderCategoryPage';
import EquipmentsUnderCategory from './Common/Pages/EquipmentsUnderCategory'
import AddEquipment from './Admin/AdminPages/AddEquipment';
import CategoryPage from './Admin/AdminPages/AllCategoryPage';
import AddCategoryPage from './Admin/AdminPages/AddCategoryPage'
import UpdateEquipment from './Admin/AdminPages/UpdateEquipment'
import AddEqui from './Admin/AddEqui';
import AllEquipmentsToSold from './Common/Pages/AllEquipments';
import SigninUsingHook from './Dups/SigninUsingHook';
import AllUsersList from "./Admin/AdminPages/AllUsersList";
import AllUsersListCopy from "./Admin/AdminPages/AllUsersListCopy";
import AllEquipments from "./Admin/AdminPages/AllEquipments";
import EquipmentsDetails from "./Common/Pages/EquipmentsDetails";
import RentLine from "./CustomerScreen/RentLine";
import TermAndConditionPopup from "./CustomerScreen/TermAndConditionPopup";
import AddOrUpdateAddress from "./CustomerScreen/AddOrUpdateAddress";
import SignoutPage from "./Common/Pages/SignoutPage";
import BookNow from "./CustomerScreen/BookNow";
import UpdateUserProfile from "./CustomerScreen/UpdateUserProfile";
import OrderHistory from "./CustomerScreen/OrderHistory";
import BookingDetails from "./CustomerScreen/BookingDetails";
// import UserRegistration1 from "./CustomerScreen/UserRegistration";
import UserRegistration from './CustomerScreen/UserRegistration'
import ViewEquiepment from "./Admin/AdminPages/ViewEquiepment";
import BookingDetailsAll from "./Admin/AdminPages/BookingDetails";
import ForgotPassword from "./Common/ForgotPassword";
import ResetPassword from "./Common/ResetPassword";
import Bookings from "./Admin/AdminPages/Bookings";
import Chart from "./Admin/AdminPages/BookingChart";
import MakeNewAdmin from "./Admin/AdminPages/MakeNewAdmin";
import NewEquipments from "./Admin/AdminPages/NewEquipments";
import PageNotFound from './Common/Pages/PageNotFound';
import DemoComponent from "./Components/DemoComponent";
import ProtectedRouter from "./routes/ProtectedRouter";
function App() {
  return (
    <div>
      <Router>
        {/*<Navbar/>*/}

        <div >
          {/*window.localStorage.getItem("user_role")!=="ADMIN" &&<Navbar />*/}
          <Switch>
            <Route path="/demo" exact component={DemoComponent} />
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/about_us" exact component={About} />
            <Route path="/contact_us" exact component={Contact} />
            <Route path="/sign_up2" exact component={UserRegister} />
            <Route path="/update-profile" component={UpdateUserProfile} />
            <Route path="/sign_up" component={UserRegistration} />
            <Route path="/sign_in" exact component={LoginPage} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/reset-password/:userName/token=/:token" exact component={ResetPassword} />
            <Route path="/user_profile" component={UserProfile} />
            <Route path="/view_profile" component={ViewProfile} />
            <Route path="/upload_file" component={FileUpload} />
            <Route path="/myaccount/profile" component={ViewProfile} />
            <Route path="/all-equpment-to-sold" component={AllEquipmentsToSold} />
            <Route path="/show-equipments-details/:id/:equipName" component={EquipmentsDetails} />
            <Route path="/show-equipments-under-category/:catId/:catName" component={EquipmentsUnderCategory} />
            <Route path="/example" component={Example} />
            <Route path="/rent-line" component={RentLine} />
            <Route path="/term-and-cond" component={TermAndConditionPopup} />
            <Route path="/update-address" component={AddOrUpdateAddress} />
            <Route path="/book-now" component={BookNow} />
            <Route path="/order-history" component={OrderHistory} />
            <Route path="/booking-details/:id" component={BookingDetails} />
            <Route path="/sign-out" component={SignoutPage} />
            <Route path="/sign_up1" component={SignUpPage} />
            <Route path="/sign-in-hook" component={SigninUsingHook} />


            <ProtectedRouter path="/admin_home" component={HomePage} />
            <ProtectedRouter path="/show-all-category" component={CategoryPage} />
            <ProtectedRouter path="/add-category" component={AddCategoryPage} />
            <ProtectedRouter path="/fatch-all-user" component={AllUsersList} />
            <ProtectedRouter path="/add-equipment-in-category/:id" component={AddEquipment} />
            <ProtectedRouter path="/equipment-under-category/:id" component={EquipmentsUnderCategoryPage} />
            <ProtectedRouter path="/equipment-all" component={AllEquipments} />
            <ProtectedRouter path="/new-equipment" component={NewEquipments} />
            <ProtectedRouter path="/update-equipment/:id" component={UpdateEquipment} />
            <ProtectedRouter path="/view-booking-details/:id" component={BookingDetailsAll} />
            <ProtectedRouter path="/view-equipment/:id" component={ViewEquiepment} />
            <ProtectedRouter path="/bookings" component={Bookings} />
            <ProtectedRouter path="/add-Equi/:id" component={AddEqui} />
            <ProtectedRouter path="/fatch-all-user-copy" component={AllUsersListCopy} />
            <ProtectedRouter path="/chart" component={Chart} />
            <ProtectedRouter path="/make-new-admin" component={MakeNewAdmin} />
          </Switch>
          <Footer />
        </div>

      </Router>
    </div>
  );
}

export default App;
