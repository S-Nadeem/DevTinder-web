import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./Error";
import { addConnections } from "../store/Slices/connectionsSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [error, seterror] = useState("");
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      seterror(err.response.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (error) {
    return <ErrorPage err={error} />;
  }

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center my-10 text-2xl">
        No Connections Found
      </h1>
    );

  return (
    <div className="my-10 text-center">
      <h1 className="text-3xl text-white text-bold">Connections</h1>

      {connections &&
        connections
          .filter((connection) => typeof connection === "object")
          .map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;

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
                  <h2 className="mb-2 text-xl font-bold ">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && (
                    <p className="text-sm text-gray-300">
                      {age}, {gender}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-400">{about}</p>
                </div>
              </div>
            );
          })}
    </div>
  );
};
export default Connections;
