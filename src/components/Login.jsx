import axios from "axios";
import { useRef } from "react";

export default function Login() {
  const userRef = useRef();
  const pwdRef = useRef();

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
    <div className="hero min-h-screen neutral-content">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Log back in!</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl neutral-content">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control neutral-content">
          <label className="label neutral-content">
            <span className="label-text bg-white-100">Username</span>
          </label>
          <input type="text" ref={userRef} className="input input-bordered" required />
        </div>
        <div className="form-control neutral-content">
          <label className="label neutral-content bg-white-100">
            <span className="label-text bg-white-100">Password</span>
          </label>
          <input type="password" ref={pwdRef} className="input input-bordered" required />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  );
}