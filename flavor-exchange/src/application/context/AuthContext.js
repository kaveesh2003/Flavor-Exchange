import React, { useState, createContext, useContext , useEffect} from "react";
import authApi from "../../infrastructure/api/AuthAPI";

// Create a new context
const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  login: (credentials) => Promise.resolve(null),
  logout: () => {},
  register: (registrationData) => Promise.resolve(null),
  authLoading: false,
  authError: null,
  loginSuccess: false,
  favRecipies: "",
  // setLocalData: ( userId,userName ,isLoggedIn ,favouriteRecipies) => Promise.resolve(null),
});

// Create a new provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [favouriteRecipies, setFavouriteRecipies] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName'); // Example key
    const storedUserId = localStorage.getItem('userId'); // Example key
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedFavRecipe = localStorage.getItem('favouriteRecipies'); // Example key

    if (storedIsLoggedIn === 'true') {
      try {
        setUser({
          "id": storedUserId, // Use the stored userId
          "name": storedUserName, // Use the stored userName
        });
        setIsLoggedIn(true);
        setLoginSuccess(true);
        setFavouriteRecipies(storedFavRecipe);
      } catch (error) {
        console.error('Error parsing new user data:', error);
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('favouriteRecipies');
        setUser(null);
        setIsLoggedIn(false);
        setLoginSuccess(false);
      }
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setLoginSuccess(false);
    }
  }, []);

  const login = async (credentials) => {
    setAuthLoading(true);
    setAuthError(null);
    setLoginSuccess(false);
    try {
      const response = await authApi.login(credentials);
      setUser(response.data);
      handleLoginSuccess(response.data);
      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token);
      setLoginSuccess(true);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      setAuthError(error.message || "Login failed");
      setLoginSuccess(false);
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Save login user data locally.
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("userId", userData?.id);
    localStorage.setItem("userName", userData?.name);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("favouriteRecipies", "");
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    setLoginSuccess(false);
    handleLogout();
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("favouriteRecipies");
  };

  const register = async (registrationData) => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      const response = await authApi.register(registrationData);
      // navigate("/login");
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      setAuthError(error.message || "Registration failed");
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        register,
        authLoading,
        authError,
        loginSuccess,
        favouriteRecipies
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a new custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
