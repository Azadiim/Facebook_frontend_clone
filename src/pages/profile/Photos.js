import { useSelector } from "react-redux";

const Photos = ({ username, token }) => {
  const { pics } = useSelector((pics) => ({ ...pics }));
  
  let photoCount = {};
  if (pics[0]?.resources && pics[0]?.resources.length !== 0) {
    photoCount = pics[0].resources;
  }
  return (
    <div className="photo_collection">
      <div className="photo_header">
        <div className="left">
          <span className="up">photos</span>
          <span className="down">
            {photoCount && photoCount?.length === 0
              ? "0 photo"
              : photoCount?.length === 1
              ? "1 photo"
              : `${photoCount?.length} photos`}
          </span>
        </div>
        <div className="right">See all photos</div>
      </div>
      <div className="photo_body">
        {photoCount &&
          photoCount.length !== 0 &&
          Object.values(photoCount)
            .slice(0, 9)
            .map(
              (
                img // to making object to array
              ) => (
                <div className="grid_photo" key={img.public_id}>
                  <img src={img.secure_url} alt="" />
                </div>
              )
            )}
      </div>
    </div>
  );
};

export default Photos;
