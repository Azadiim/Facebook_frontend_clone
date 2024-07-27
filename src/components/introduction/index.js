import "./style.css";
import { useState } from "react";

const Intro = ({ details, yourPage }) => {
  const initial = {
    bio: details?.bio ? details.bio : "Welcome to my bio",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "Full-Stack Developer",
    workplace: details?.workplace ? details.workplace : "google",
    hightSchool: details?.hightSchool ? details.hightSchool : "Slahadin",
    college: details?.college ? details.college : "Tabriz University",
    currentCity: details?.currentCity ? details.currentCity : "Liverpool",
    hometown: details?.hometown ? details.hometown : "Bokan",
    relationship: details?.relationship ? details.relationship : "Married",
    instagram: details?.instagram ? details.instagram : "azad_am88",
  };
  const [intro, setIntro] = useState(initial);
  return (
    <div className="photo_collection">
      <div className="photo_header">
        <span className="Intro_header">Intro</span>
      </div>
      {intro.bio && (
        <div className="intro_details_bio">
          <span>{intro.bio}</span>
          {yourPage && <button className="gray_btn">Edit bio</button>}
        </div>
      )}
      {intro.job && intro.workplace ? (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
            alt=""
          />
          <span>
            works as {intro.job} at {intro.workplace}
          </span>
        </div>
      ) : intro.job && !intro.workplace ? (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
            alt=""
          />
          <span>works as {intro.job}</span>
        </div>
      ) : (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
            alt=""
          />
          <span>works in {intro.workplace}</span>
        </div>
      )}
      {intro.college && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938972/icons/studies_yawfuz.png"
            alt=""
          />
          <span>studied at {intro.college}</span>
        </div>
      )}
      {intro.hightSchool && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938972/icons/studies_yawfuz.png"
            alt=""
          />
          <span>Studied at {intro.hightSchool}</span>
        </div>
      )}
      {intro.hometown && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938922/icons/home_wdq8jq.png"
            alt=""
          />
          <span>Born and Raised In {intro.hometown}</span>
        </div>
      )}
      {intro.currentCity && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938922/icons/home_wdq8jq.png"
            alt=""
          />
          <span>Now Lives In {intro.currentCity}</span>
        </div>
      )}
      {intro.relationship && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938969/icons/relationship_c7bpox.png"
            alt=""
          />
          <span>{intro.relationship}</span>
        </div>
      )}
      {intro.instagram && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938959/icons/instagram_helgjd.png"
            alt=""
          />
          <a
            href={`https://www.instagram.com/${intro.instagram}/`}
            target="_bland"
          >
            follow me on instagram
          </a>
        </div>
      )}
      <div className="btn_collection">
        {yourPage && <button className="gray_btn">Edit Details</button>}
        {yourPage && <button className="gray_btn">Add Hobbies</button>}
        {yourPage && <button className="gray_btn">Edit Featured</button>}
      </div>
    </div>
  );
};

export default Intro;
