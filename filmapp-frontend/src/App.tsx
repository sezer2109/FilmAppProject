import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import PopularMovies from "./pages/PopularMovies";
import PopularActors from "./pages/PopularActors";
import MovieSuggest from "./pages/MovieSuggest";
import MovieDetails from "./pages/MovieDetails"; 

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);

    if (t) {
      const decoded = parseJwt(t);
      const userRole =
        decoded &&
        (decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ] ||
          decoded["role"] ||
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"
          ]);

      setRole(userRole ?? null);

      if (window.location.pathname === "/login") {
        if (userRole === "actor") navigate("/actors");
        else navigate("/movies");
      }
    } else {
      setRole(null);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  };

  const buttonStyle = {
    marginLeft: 20,
    padding: "8px 16px",
    backgroundColor: "#ffffff",
    color: "#0047AB",
    border: "none",
    borderRadius: 5,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 14,
  };

  return (
    <>
      {token && role && (
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            padding: "15px 0",
            background: "linear-gradient(to right, #0047AB, #007BFF)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
            color: "white",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {(role === "film" || role === "admin") && (
            <Link to="/movies" style={linkStyle}>
              Popüler Film Listele
            </Link>
          )}
          {(role === "actor" || role === "admin") && (
            <Link to="/actors" style={linkStyle}>
              Popüler Oyuncu Listele
            </Link>
          )}
          <Link to="/suggest" style={linkStyle}>
            Film Öner
          </Link>
          <button onClick={logout} style={buttonStyle}>
            Çıkış Yap
          </button>
        </nav>
      )}

      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate
                to={role === "actor" ? "/actors" : "/movies"}
                replace
              />
            ) : (
              <LoginPage />
            )
          }
        />
        {(role === "film" || role === "admin") && (
          <>
            <Route
              path="/movies"
              element={
                <RequireAuth>
                  <PopularMovies />
                </RequireAuth>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <RequireAuth>
                  <MovieDetails />
                </RequireAuth>
              }
            />
          </>
        )}
        {(role === "actor" || role === "admin") && (
          <Route
            path="/actors"
            element={
              <RequireAuth>
                <PopularActors />
              </RequireAuth>
            }
          />
        )}
        <Route
          path="/suggest"
          element={
            <RequireAuth>
              <MovieSuggest />
            </RequireAuth>
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={token ? (role === "actor" ? "/actors" : "/movies") : "/login"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
