import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "../Redux/authSlice";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "../pages/Navbar";
import HeroSection from "../pages/Hero";
import Services from "../pages/Services";
import About from "../pages/About";
import Contact from "../pages/Contact";

import ProtectedRoute from "./protectedRoute";
import EventOptions from "../components/EventOptions";
import ViewEvents from "../components/viewEvent";
import CreateEvent from "../components/createEvent";
import DeleteEvent from "../components/deleteEvent";
import UpdateEvent from "../components/updateEvent";
import CoordinatorDashboard from "../coordinator_dashboard/coordinator_dashboard";
import TasksDashboard from "../tasks_dashboard/tasks_dashboard";
import VendorsDashboard from "../vendor-dashbord/vendor-dashboard";
import CreateTask from "../tasks_dashboard/createTask";
import AssignVendorToTask from "../tasks_dashboard/assignTask";
import UpdateTaskStatus from "../tasks_dashboard/updateTask";
import DeleteTask from "../tasks_dashboard/deleteTask";
import AddVendor from "../vendor-dashbord/addVendor";
import ViewVendors from "../vendor-dashbord/viewVendors";
import AssignVendorToTaskPage from "../vendor-dashbord/assignVendor";
import DeleteVendor from "../vendor-dashbord/deletevendor";
import UpdateVendor from "../vendor-dashbord/updateVendor";
import ViewTasks from "../tasks_dashboard/viewTasks";
import GuestManagement from "../pages/guestManagement";
import GuestList from "../pages/viewGuest";
import AddGuest from "../pages/addGuest";



const AppRoutes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("access_token");

        if (storedUser && storedToken) {
            dispatch(setUser({ user: storedUser, token: storedToken }));
        }
    }, [dispatch]);

    return (
        <>
            <Navbar />
            
            <Routes>
                <Route path="/" element={<HeroSection />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* 🔒 Protected Route for Events */}
                
                {/* Public Routes */}
                <Route path="/events" element={<EventOptions />} />
                <Route path="/events/get" element={<ViewEvents />} />
                <Route path="/events/create"element={<ProtectedRoute allowedRoles={["user"]}><CreateEvent /> </ProtectedRoute>}/>

                <Route path="/events/delete/:eventId" element={<ProtectedRoute allowedRoles={["user","coordinator","admin"]}><DeleteEvent /></ProtectedRoute>} />
                <Route path="/events/update/:eventId" element={<ProtectedRoute allowedRoles={["user"]}><UpdateEvent /> </ProtectedRoute>}/>
                
                <Route path="/events/:eventId/guests" element={<GuestManagement />} />
                <Route path="/events/:eventId/guests/view" element={<GuestList />} />
                <Route path="/events/:eventId/guests/add" element={<AddGuest />} />

                <Route path="/coordinator-dashboard" element={<ProtectedRoute allowedRoles={["coordinator","admin"]}><CoordinatorDashboard /></ProtectedRoute>} />
                
                <Route path="/events/:eventId/tasks" element={<ProtectedRoute allowedRoles={["user"]}><TasksDashboard /></ProtectedRoute>} />
                <Route path="/tasks/create" element={<CreateTask />} />
                <Route path="/tasks/assign-vendor" element={<AssignVendorToTask />} />
                <Route path="/tasks/get" element={<ViewTasks />} />
                <Route path="/tasks/update-status" element={<UpdateTaskStatus />} />
                <Route path="/tasks/delete" element={<DeleteTask />} />

                <Route path="/vendors" element={<ProtectedRoute allowedRoles={["coordinator"]}><VendorsDashboard /></ProtectedRoute>} />
                <Route path="/vendors/add" element={<ProtectedRoute allowedRoles={["coordinator"]}><AddVendor /></ProtectedRoute>} />
                <Route path="/vendors/get" element={<ProtectedRoute allowedRoles={["coordinator"]}><ViewVendors /></ProtectedRoute>} />
                <Route path="/vendors/assign-task" element={<ProtectedRoute allowedRoles={["coordinator"]}><AssignVendorToTaskPage /></ProtectedRoute>} />
                <Route path="/vendors/delete" element={<ProtectedRoute allowedRoles={["coordinator"]}><DeleteVendor /></ProtectedRoute>} />
                <Route path="/vendors/update/:vendorId" element={<ProtectedRoute allowedRoles={["coordinator"]}><UpdateVendor /></ProtectedRoute>} />
                
                {/* <Route path="/users" element={<ProtectedRoute allowedRoles={["coordinator", "admin"]}><UsersDashboard /></ProtectedRoute>} /> */}
            </Routes>
        
        </>
    );
};

export default AppRoutes;
