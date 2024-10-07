import { useSelector } from "react-redux";

const ReactPopUp = ({ react, setReact, reactHandler }) => {
  const reactsArray = [
    { name: "like", image: "./reacts/like.gif" },
    { name: "love", image: "./reacts/love.gif" },
    { name: "haha", image: "./reacts/haha.gif" },
    { name: "wow", image: "./reacts/wow.gif" },
    { name: "sad", image: "./reacts/sad.gif" },
    { name: "angry", image: "./reacts/angry.gif" },
  ];

  return (
    <>
      {react && (
        <div
          className="react_pop_up"
          onMouseOver={() => {
            setTimeout(() => {
              setReact(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setReact(false);
            }, 500);
          }}
        >
          {reactsArray.map((image, i) => (
            <div
              className="react"
              key={i}
              onClick={() => {
                reactHandler(image.name);
              }}
            >
              <img src={image.image} alt="" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReactPopUp;
