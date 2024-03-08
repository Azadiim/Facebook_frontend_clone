import { ArrowRight, Plus } from "../../../svg";
import "./style.css";
import { stories } from "../../../data/home";
import Stor from "./Stor";
import { useMediaQuery } from "react-responsive";

const Story = () => {
  const query1175px = useMediaQuery({
    query: "(max-width:1175px)",
  });
  const query940px = useMediaQuery({
    query: "(max-width:940px)",
  });
  const max =query940px? 5: query1175px ? 4 : stories.length;
  return (
    <div className="story">
      <div className="story_card">
        <img
          src={require("../../../postBackgrounds/default_pic.png")}
          alt="pic"
          className="story_card_pic"
        />
        <div className="story_card_plus">
          <Plus color="#fff" />
        </div>
        <div className="story_card_footer">Create Story</div>
      </div>
      {stories.slice(0, max).map((story, i) => (
        <Stor story={story} key={i}/>
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
};

export default Story;
