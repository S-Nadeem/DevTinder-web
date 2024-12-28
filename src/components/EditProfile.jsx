import PropTypes from "prop-types";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/Slices/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState();
  const [toast, setToast] = useState(false);

  const handleProfileSave = async () => {
    setError("");
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // Explicitly set headers
          },
        }
      );
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="shadow-xl card bg-base-300 w-96">
            <div className="card-body">
              <h2 className="justify-center card-title">Edit Profile</h2>
              <div>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">First Name:</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <label className="w-full max-w-xs my-2 form-control">
                    <div className="label">
                      <span className="label-text">Last Name:</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="w-full max-w-xs input input-bordered"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                  <div className="label">
                    <span className="label-text">Photo URL :</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">Age:</span>
                  </div>
                  <input
                    type="text"
                    value={age}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">Gender:</span>
                  </div>
                  <input
                    type="text"
                    value={gender}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="w-full max-w-xs my-2 form-control">
                  <div className="label">
                    <span className="label-text">About:</span>
                  </div>
                  <textarea
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    className="w-full max-w-xs textarea textarea-bordered textarea-sm"
                  ></textarea>
                </label>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="justify-center m-2 card-actions">
                <button className="btn btn-primary" onClick={handleProfileSave}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

EditProfile.propTypes = {
  user: PropTypes.shape({
    photoUrl: PropTypes.string,
    age: PropTypes.number,
    about: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
  }),
};
