import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { forgetPass } = useAuth();

  async function handleForgetPass(e) {
    e.preventDefault();

    const email = e.target[0].value;

    if (email === "") return setError("Enter your email!");

    try {
      setLoading(true);
      await forgetPass(email);
      setError("Verification Mail Sent!");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }

    setLoading(false);
  }

  return (
    <div className="login">
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img src={"/assets/logo.svg"} alt="Logo" />
      </h1>
      <form className="auth-form" onSubmit={handleForgetPass}>
        <h1 style={{ fontWeight: "lighter" }}>Forget Password?</h1>
        {error && <p style={{ color: "#fc4747" }}>{error}</p>}
        <p>
          Enter your email and a mail will send to get back into your account.
        </p>
        <input type={"email"} placeholder="Enter Email.." />
        <button disabled={loading} type="submit">
          {loading ? "loading..." : "Send Mail"}
        </button>
        <p style={{ textAlign: "right" }}>
          <Link to={"/login"} children={<b>Login</b>} />
        </p>
      </form>
    </div>
  );
}
