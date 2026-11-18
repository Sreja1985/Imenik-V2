import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routsEnum";
import "../../styles/Forms.css";
import axios from "axios";
import { useState } from "react";

function LoginForm() {

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event: any) => {
    event.preventDefault()
    axios.post('http://localhost:3000/auth/adminlogin', values) // localStorage.setItem("valid", JSON.stringify(true));
    .then(result => {
      if (result.data.loginStatus) {
        localStorage.setItem("valid", "true");
        navigate('/dashboard');
      } else {
        setError(result.data.Error);
      }
      
    })
    .catch(err => console.log(err))
}

  return (
    <div className="container-fluid">
      <form className="mx-auto" onSubmit={handleSubmit}>
        <div className="col-sm-12 form-group mt-4">
          <label htmlFor="userName" className="form-label">
            Korisničko ime<span className="required">*</span>
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name="username"
              id="userName"
              aria-describedby="emailHelp"
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-sm-12 form-group">
          <label htmlFor="password" className="form-label">
            Lozinka<span className="required">*</span>
          </label>
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="col-sm-12 form-group mt-5">
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary  btn-md ">
              Prijava
            </button>
            <button type="button" className="btn btn-secondary  btn-md ">
              <Link to={RoutesEnum.ROOT} className="link">
                Odustani
              </Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
