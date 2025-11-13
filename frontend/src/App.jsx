import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import "./index.css";

import Layout from "./layout/Layout.jsx";

import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import UserForm from "./components/UserForm/UserForm.jsx";
import Preview from "./components/Preview/Preview.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


const App = () => {
    const [plan, setPlan] = useState(null);
    const [id, setId] = useState(null);


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout />}>
                <Route index element={<UserForm setPlan={setPlan} />} />
                <Route path='/login' element={<Login setId={setId} />} />
                <Route path='/preview' element={<Preview plan={plan} id={id} />} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
export default App;
