import { Dots } from "../../svg";
import { stories } from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";

const PplYouMayKnow = () => {
  return (
    <div className="ppl_you_know">
      <div className="ppl_you_know_header">
        <span> People You May Know</span>
        <div className="post_header_right ppl_circle">
          <Dots />
        </div>
      </div>
      <div className="ppl_you_know_list">
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PplYouMayKnow;
