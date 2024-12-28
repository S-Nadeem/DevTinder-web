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

  const handleProfileSave = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center my-20">
        <div className="flex justify-center mx-10">
          <div className="shadow-xl card bg-base-300 w-96">
            <div className="card-body">
              <h2 className="justify-center card-title">Login</h2>
              <div>
                <label className="w-full max-w-xs my-3 form-control">
                  <div className="mb-2">
                    <div className="label ">First Name</div>
                    <input
                      type="text"
                      value={firstName}
                      className="w-full max-w-xs input input-bordered"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="label">Last Name</div>
                  <input
                    type="text"
                    value={lastName}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <div className="label">PhotoUrl: </div>
                  <input
                    type="text"
                    value={[photoUrl]}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                  <div className="label">Age</div>
                  <input
                    type="text"
                    value={age}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <div className="label">Gender</div>
                  <input
                    type="text"
                    value={gender}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <div className="label">About</div>
                  <input
                    type="text"
                    value={about}
                    className="w-full max-w-xs input input-bordered"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              <div className="justify-center card-actions">
                <button
                  onClick={handleProfileSave}
                  className=" btn btn-primary"
                >
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
