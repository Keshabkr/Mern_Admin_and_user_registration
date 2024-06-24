
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { storeTokenInLS } = useAuth();

 
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(URL , {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user),
      });

      console.log("login",response);

      if(response.ok) {
        alert("login successful");
        const res_data = await response.json();
          console.log("res from server", res_data);
          storeTokenInLS(res_data.token);
          //localStorage.setItem("token", res_data.token);
        setUser({
          
          email: "",
          password: "",});
          navigate("/");

      }else {
        alert("invalid credentials")
        console.log("invalid credentials");
      }
  
      
    } catch (error) {
      console.log(error);
    }
  };

 
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="lets fill the login form"
                  width="400"
                  height="500"
                />
              </div>
              
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
