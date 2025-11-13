import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { AuthProvider } from "../context/authContext.jsx";

function Layout() {
  return (
    <div className="app-layout">
        <AuthProvider>
        <Header />
        </AuthProvider>
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
