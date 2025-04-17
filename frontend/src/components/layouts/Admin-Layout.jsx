import { NavLink, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../store/auth";


export const AdminLayout = () => {

  const {user, isLoading} = useAuth();

  if(isLoading){
    return <h1>Loading...</h1>
  }

  if(!user.isAdmin){
    return <Navigate to = "/"/>;

  }
  return <>
  <header>
    <div className="container">
      <nav>
        <ul>
          <li>
          <NavLink to="/admin/users"> users </NavLink>
          </li>
          <li>
          <NavLink to="/admin/contact"> contacts </NavLink>
          </li>
          <li>
          <NavLink to="/service"> services </NavLink>
          </li>
          <li>
          <NavLink to="/"> Home </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <Outlet/>
  </>
}