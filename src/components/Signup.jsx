import axios from "axios";
import { useRef } from "react";

export default function Signup() {
    const userRef = useRef()
    const emailRef = useRef()
    const pwdRef = useRef()
    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
          username: userRef.current.value,
          email: emailRef.current.value,
          password: pwdRef.current.value,
        };
    
       
    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/signup`,
      user,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    window.location.href = "/login";
}

return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Register</h1>
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
            <span className="label-text">Email</span>
          </label>
          <input type="email" ref={emailRef} className="input input-bordered" required />
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