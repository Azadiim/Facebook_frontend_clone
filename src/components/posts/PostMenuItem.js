const PostMenuItem = ({ icon, title, subtitle, img }) => {
  return (
    <li className="post_item_wrap hover1">
      {img ? <img src={img} alt=""></img> : <i className={icon}></i>}
      <div className="post_item_subtitle">
        <span>{title}</span>
        {subtitle && <span className="post_text_subtitle"> {subtitle} </span>}
      </div>
    </li>
  );
};

export default PostMenuItem;
