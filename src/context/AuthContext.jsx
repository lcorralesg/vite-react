import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, preRegisterRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const preSignup = async (user) => {
    try {
      const response = await preRegisterRequest(user);
      if (response.status === 200) {
        setUser(response.data);
      } else {
        console.log(response.status);
        setErrors(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrors("Ocurrió un error al realizar la solicitud");
    }
  };
  
  const signup = async (user) => {
    try {
      console.log(user);
      const response = await registerRequest(user);
      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        console.log(response.status);
        setErrors(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };    

  const singinGoogle = async (user) => {
    const login_user = {
      email: user.email,
      password: user.password,
    };
    try {
      const res = await loginRequest(login_user);
      setUser(res.data);
      setIsAuthenticated(true);
      if (res.status === 200) {
        console.log("Usuario logeado");
      }
    } catch (error) {
        signup(user);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        preSignup,
        signup,
        signin,
        singinGoogle,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;