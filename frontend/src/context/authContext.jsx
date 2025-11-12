import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // fetch logged-in user once when app starts
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// helper hook
export function useAuth() {
  return useContext(AuthContext);
}
