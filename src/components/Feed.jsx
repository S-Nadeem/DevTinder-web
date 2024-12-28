import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/Slices/feedSlice";
import { useState } from "react";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const fetchFeedData = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      setError(error.response.data);
    }
  };
  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    feed?.data.length && (
      <div className="flex justify-center my-10">
        <p>{error}</p>
        <UserCard user={feed.data[0]} isFeedoptions={true} />
      </div>
    )
  );
};

export default Feed;
