import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect When Logged in
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords Do Not Match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please Create An Account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="formControl"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="formControl"
              name="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="formControl"
              name="password"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="formControl"
              name="password2"
              id="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Your Password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
