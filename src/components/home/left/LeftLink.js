const LeftLink = ({ img, text, notification }) => {
  return (
    <div className="left_link hover3">
      <img src={`../../../left/${img}.png`} alt="pic" />
      {notification !== undefined ? (
        <div className="col">
          <div className="col_1">{text}</div>
          <div className="col_2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

export default LeftLink;
