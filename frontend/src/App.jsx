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



const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Layout />}>
                <Route index element={<UserForm />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />;
};
export default App;
