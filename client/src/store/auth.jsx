import { createContext, useContext,useEffect,  useState } from "react";



export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken  = `Bearer ${token}`;
  
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  //console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);


  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method : "GET",
        headers : {
          Authorization : authorizationToken,
        },
      });

      if(response.ok){
        const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);
        setIsLoading(false);
      }
      else{
        console.error("error in fetching data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error in fetching user data");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn , storeTokenInLS , LogoutUser , user,authorizationToken, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};