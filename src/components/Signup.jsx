import axios from "axios";
import { useRef } from "react";

export default function Signup() {
  const userRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username: userRef.current.value,
      email: emailRef.current.value,
      password: pwdRef.current.value,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/signup/`,
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Signup successful");
        window.location.href = "/login";
      } else {
        console.error("Signup failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);

    }
  }

return (
    <div className="hero min-h-screen bg-grey">
  <div className="hero-content flex-col lg:flex-row-reverse bg-grey">
    <div className="text-center lg:text-left bg-white">
      <h1 className="text-5xl font-bold">Register</h1>
    </div>
    <div className="card shrink-0 w-full max-w-sm bg-white">
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
        <div className="form-control ">
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