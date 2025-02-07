import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { addRequests, removeRequest } from "../store/Slices/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequestHandler = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-2xl">No requests Found</h1>
    );

  return (
    <div className="my-10 text-center">
      <h1 className="text-3xl text-white text-bold">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex w-full max-w-xl p-4 mx-auto my-4 rounded-lg shadow-lg bg-base-200"
          >
            <div className="flex-shrink-0">
              <img
                alt="photo"
                className="object-cover w-20 h-20 rounded-full"
                src={photoUrl || "https://via.placeholder.com/80"}
              />
            </div>
            <div className="flex-grow m-2 ml-4 text-left">
              <h2 className="mb-2 text-xl font-bold">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-300">
                  {age}, {gender}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-400 line-clamp-3">{about}</p>
              <div className="flex mt-4 space-x-4">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequestHandler("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequestHandler("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
