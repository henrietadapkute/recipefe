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
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" ref={userRef} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
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