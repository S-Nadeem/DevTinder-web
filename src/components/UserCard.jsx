import PropTypes from "prop-types";
const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  console.log(user);
  return (
    <div className="shadow-xl card bg-base-300 w-96 my-7">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {gender && age && <p>{`${age}, ${gender}`}</p>}
        <p>{about}</p>
        <div className="justify-center my-4 card-actions">
          <button className="bg-pink-100 btn ">Ignored</button>
          <button className="bg-green-300 btn ">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

UserCard.propTypes = {
  user: PropTypes.shape({
    photoUrl: PropTypes.string,
    age: PropTypes.number,
    about: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
  }),
};
