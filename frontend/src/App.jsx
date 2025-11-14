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


const App = () => {
    const [plan, setPlan] = useState(null);
    const [plans, setPlans] = useState([])
    const [id, setId] = useState(null);
    useEffect(() => {
        const loadPlans = async() =>{
            console.log(id)
            const res = await fetch("http://localhost:8000/api/loadPlan", {method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({userId:id}),
            });



            if (!res.ok) {
                throw new Error('Request failed: ' + res.status);
            }
            const rawPlans = await res.json()
            setPlans(rawPlans)
        }
        loadPlans()
    }, [id])
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout setId={setId} plans={plans} />}>
                <Route index element={<UserForm setPlan={setPlan} />} />
                <Route path='/login' element={<Login setId={setId}/>} />
                {/*<Route path='/home' element={<PlanPage plans={plans}/>} />*/}
                <Route path='/preview' element={<Preview plan={plan} id={id} />} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
export default App;
