import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    currentUser && navigate("/");
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;
    const confirmPass = e.target[2].value;

    if (email === "" || pass === "" || confirmPass === "")
      return setError("Fill the details");

    if (pass !== confirmPass) return setError("Password Don't Match");

    try {
      setLoading(true);
      await signup(email, pass);
      navigate("/");
      setError("");
    } catch (error) {
      setLoading(true);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="signup">
      <h1 style={{ textAlign: "center", marginBottom: "3rem" }}>
        <img src={"/assets/logo.svg"} alt="Logo" />
      </h1>
      <form className="auth-form" onSubmit={handleSignUp}>
        <h1 style={{ fontWeight: "lighter" }}>Sign Up</h1>
        {error && <p style={{ color: "#fc4747" }}>{error}</p>}
        <input type={"email"} placeholder="Enter Email.." />
        <input type={"password"} placeholder="Enter Password" />
        <input type={"password"} placeholder="Confirm Password" />
        <button disabled={loading} type="submit">
          {loading ? "loading..." : "Create an account"}
        </button>
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to={"/login"} children={<b>Login</b>} />
        </p>
      </form>
    </div>
  );
};

export default SignUp;
