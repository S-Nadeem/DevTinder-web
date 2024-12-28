import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/Slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("naddu@gmail.com");
  const [password, setPaswword] = useState("Naddu@197");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      return navigate("/");
    } catch (error) {
      setError(
        error?.response?.data || "Something went wrong please try again"
      );
    }
  };
  return (
    <div className="flex justify-center my-5">
      <div className="shadow-xl card bg-base-300 w-96">
        <div className="card-body">
          <h2 className="justify-center card-title">Login</h2>
          <div>
            <label className="w-full max-w-xs my-3 form-control">
              <div className="mb-2">
                <div className="label ">Email</div>
                <input
                  type="text"
                  value={emailId}
                  className="w-full max-w-xs input input-bordered"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <div className="label">Password</div>
              <input
                type="text"
                value={password}
                className="w-full max-w-xs input input-bordered"
                onChange={(e) => setPaswword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-800">{error}</p>
          <div className="justify-center card-actions">
            <button onClick={handleLogin} className=" btn btn-primary">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
