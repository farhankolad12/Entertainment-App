import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    currentUser && navigate("/");
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (email === "" || pass === "") return setError("Fill the details");

    try {
      setLoading(true);
      await login(email, pass);
      navigate("/");
      setError("");
    } catch (error) {
      setLoading(true);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img src={"/assets/logo.svg"} alt="Logo" />
      </h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <h1 style={{ fontWeight: "lighter" }}>Login</h1>
        {error && <p style={{ color: "#fc4747" }}>{error}</p>}
        <input type={"email"} placeholder="Enter Email.." />
        <input type={"password"} placeholder="******" />
        <Link to="/forget-password">
          <span>Forget Password?</span>
        </Link>
        <button disabled={loading} type="submit">
          {loading ? "loading..." : "Login to your account"}
        </button>
        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to={"/signup"} children={<b>Sign Up</b>} />
        </p>
      </form>
    </div>
  );
};

export default Login;
