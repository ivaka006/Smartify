import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import "./index.css";

import Layout from "./layout/Layout.jsx";

import PlanPage from './components/Planpage/Planpage.jsx';
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import UserForm from "./components/UserForm/UserForm.jsx";
import Preview from "./components/Preview/Preview.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "./context/authContext.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const App = () => {
    const [plan, setPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [id, setId] = useState(null);
    const { user } = useAuth();

    // Keep id in sync with auth context so page refresh doesn't lose user state
    useEffect(() => {
        if (user?._id) setId(user._id);
        else setId(null);
    }, [user]);

    useEffect(() => {
        if (!id) return;
        const loadPlans = async () => {
            try {
                const res = await fetch(`${API}/api/loadPlan`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: id }),
                });
                if (!res.ok) throw new Error('Request failed: ' + res.status);
                const rawPlans = await res.json();
                setPlans(rawPlans);
            } catch (err) {
                console.error('Failed to load plans:', err);
            }
        };
        loadPlans();
    }, [id]);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout setId={setId} />}>
                <Route index element={<UserForm setPlan={setPlan} />} />
                <Route path='/login' element={<Login setId={setId}/>} />
                <Route path='/preview' element={<Preview plan={plan} id={id} />} />
                <Route path='/register' element={<Register/>}/>
                <Route path="/plan-page" element={<PlanPage plans={plans} />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
export default App;
