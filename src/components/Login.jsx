import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const userRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate()

 const handleRegisterClick = () => {
      navigate('/signup/');
    };

 

  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username: userRef.current.value,
      password: pwdRef.current.value,
    };

   

    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/token/`,
      user,
      {
        headers: { "Content-Type": "application/json" },
      },
      {
        withCredentials: true,
      }
    );
    localStorage.clear();
    localStorage.setItem("access_token", data.access)
    localStorage.setItem("refresh_token", data.refresh)
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.access}`;
    window.location.href = "/"
  } 

  return (
    <div className="hero min-h-screen bg-white">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl p-6">Log back in!</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-indigo-200">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className=" bg-indigo-200">
          <label className="label">
            <span className="label-text font-bold">Username</span>
          </label>
          <input type="text" ref={userRef} className="input input-bordered bg-white" required />
        </div>
        <div className=" bg-indigo-200">
          <label className="label">
            <span className="label-text font-bold">Password</span>
          </label>
          <input type="password" ref={pwdRef} className="input input-bordered bg-white" required />
        </div>
        <div className="form-control mt-6 bg-indigo-200">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
   <button onClick={handleRegisterClick}>Register</button>
  </div> 
</div>
  );
}