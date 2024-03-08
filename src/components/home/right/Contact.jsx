const Contact = ({ user }) => {
  return (
    <div className="contact_comp">
      <div className="contact_comp_img">
        <img
          src={require("../../../postBackgrounds/default_pic.png")}
          alt="pic"
        />
      </div>
      <span>{user.first_name} {user.last_name} </span>
    </div>
  );
};

export default Contact;
