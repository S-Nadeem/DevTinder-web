import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeUserfromFeed } from "../store/Slices/feedSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
const UserCard = ({ user, isFeedoptions }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const handlefeedRequests = async (status, userId) => {
    await axios.post(
      `${BASE_URL}/request/send/${status}/${userId}`,
      {},
      { withCredentials: true }
    );
    dispatch(removeUserfromFeed(userId));
  };

  return (
    <div className="shadow-xl card bg-base-300 w-96 my-7">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {gender && age && <p>{`${age}, ${gender}`}</p>}
        <p>{about}</p>

        {isFeedoptions && (
          <div className="justify-center my-4 card-actions">
            <button
              className="bg-pink-200 btn btn-primary "
              onClick={() => handlefeedRequests("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="bg-green-300 btn btn-primary "
              onClick={() => handlefeedRequests("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;

UserCard.propTypes = {
  user: PropTypes.shape({
    photoUrl: PropTypes.string,
    _id: PropTypes.string,
    age: PropTypes.number,
    about: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
  }),
  isFeedoptions: PropTypes.boolean,
};
