import Bio from "./bio";
import "./style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import OtherDetails from "./otherDetails";

const Intro = ({ detailss, yourPage }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [details, setDetails] = useState(detailss);
  useEffect(() => {
    setDetails(detailss);
  }, [detailss]);
  const initial = {
    bio: details?.bio ? details.bio : "",
    otherName: details?.otherName ? details.otherName : "",
    job: details?.job ? details.job : "",
    workplace: details?.workplace ? details.workplace : "",
    hightSchool: details?.hightSchool ? details.hightSchool : "",
    college: details?.college ? details.college : "",
    currentCity: details?.currentCity ? details.currentCity : "",
    hometown: details?.hometown ? details.hometown : "",
    relationship: details?.relationship ? details.relationship : "",
    instagram: details?.instagram ? details.instagram : "",
  };

  const [intro, setIntro] = useState(initial);
  const [showBio, setShowBio] = useState(false);
  const [other, setOther] = useState(false);
  const [max, setMax] = useState(intro?.bio ? 100 - intro.bio.length : 100);

  const handleBio = (e) => {
    setIntro({ ...intro, bio: e.target.value });
    setMax(100 - e.target.value.length);
  };
  const handleUpdatedBio = async () => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/updateCover/bio`,
        { intro },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setShowBio(false);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("intro", intro);

  return (
    <div className="photo_collection">
      <div className="photo_header">
        <span className="Intro_header">Intro</span>
      </div>
      {details?.bio && !showBio && (
        <div className="intro_details_bio">
          <span>{details?.bio}</span>
        </div>
      )}
      {yourPage && (
        <div className="btn_collection">
          {" "}
          <button
            className="gray_btn"
            onClick={() => {
              setShowBio(true);
            }}
          >
            Edit bio
          </button>
        </div>
      )}

      {showBio && (
        <Bio
          setShowBio={setShowBio}
          max={max}
          handleBio={handleBio}
          intro={intro}
          handleUpdatedBio={handleUpdatedBio}
        />
      )}
      {details?.job && details?.workplace ? (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
            alt=""
          />
          <span>
            works as {details.job} at {details.workplace}
          </span>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
            alt=""
          />
          <span>works as {details.job}</span>
        </div>
      ) : !details?.job && details?.workplace ? (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
            alt=""
          />
          <span>works in {details.workplace}</span>
        </div>
      ) : (
        ""
      )}
      {details?.college && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938972/icons/studies_yawfuz.png"
            alt=""
          />
          <span>studied at {details.college}</span>
        </div>
      )}
      {details?.hightSchool && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938972/icons/studies_yawfuz.png"
            alt=""
          />
          <span>Studied at {details.hightSchool}</span>
        </div>
      )}
      {details?.hometown && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938922/icons/home_wdq8jq.png"
            alt=""
          />
          <span>Born and Raised In {details.hometown}</span>
        </div>
      )}
      {details?.currentCity && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938922/icons/home_wdq8jq.png"
            alt=""
          />
          <span>Now Lives In {details.currentCity}</span>
        </div>
      )}
      {details?.relationship && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938969/icons/relationship_c7bpox.png"
            alt=""
          />
          <span>{details?.relationship}</span>
        </div>
      )}
      {details?.instagram && (
        <div className="intro_details">
          <img
            src="https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938959/icons/instagram_helgjd.png"
            alt=""
          />
          <a
            href={`https://www.instagram.com/${details?.instagram}/`}
            target="_bland"
          >
            follow me on instagram
          </a>
        </div>
      )}
      <div className="btn_collection">
        {yourPage && (
          <button className="gray_btn" onClick={() => setOther(true)}>
            Edit Details
          </button>
        )}
        {other && <OtherDetails setOther={setOther} />}
        {yourPage && <button className="gray_btn">Add Hobbies</button>}
        {yourPage && <button className="gray_btn">Edit Featured</button>}
      </div>
    </div>
  );
};

export default Intro;
