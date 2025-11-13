import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

  // fetch logged-in user once when app starts
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    fetchUser();
  }, [API]);


  async function logout() {
    try {
      await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null); 
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// helper hook
export function useAuth() {
  return useContext(AuthContext);
}
