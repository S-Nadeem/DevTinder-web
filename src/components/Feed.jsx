import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/Slices/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeedData = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  if (!feed || feed.length === 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} isFeedoptions={true} />
    </div>
  );
};

export default Feed;
