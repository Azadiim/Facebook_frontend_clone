const LeftShortCut = ({ link, name, img }) => {
  return (
    <a href={link} target="blank" rel="noreferror" className="shortcut_item">
      <img src={img} alt=" " />
      <span className="shortcut_item_span">{name}</span>
    </a>
  );
};

export default LeftShortCut;
