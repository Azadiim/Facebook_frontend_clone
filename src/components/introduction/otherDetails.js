import { useRef, useState } from "react";
import InnerDetails from "./innerDetails";
import useClickOutSide from "../../helpers/clickOutSide";

const OtherDetails = ({
  setOther,
  handleUpdatedBio,
  handleBio,
  details,
  showBio,
  loading,
  setLoading,
  intro,
}) => {
  const refIntro = useRef(null);
  useClickOutSide(refIntro, () => {
    setOther(false);
  });
  const [visible, setVisible] = useState(0);

  return (
    <div className="blur">
      <div className="create_post_box pictureBox" ref={refIntro}>
        <div className="create_post_box_header other_header">
          <span>Edit Details</span>
          <div
            className="small_circle"
            onClick={() => {
              setOther(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
        <div className="body_other_details">
          <div className="customize">
            <div className="custom_header">Customize Your Intro</div>
            <div className="body">Details you selected will be public</div>
          </div>

          <div className="othername" onClick={() => setVisible(1)}>
            <InnerDetails
              intro={intro}
              value={details?.otherName}
              header={"otherName"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div className="job" onClick={() => setVisible(2)}>
            <InnerDetails
              intro={intro}
              value={details?.job}
              header={"Job Title"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <div className="workplace" onClick={() => setVisible(3)}>
            <InnerDetails
              intro={intro}
              value={details?.workplace}
              header={"Work Place"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938961/icons/job_i7ocx5.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <div className="college" onClick={() => setVisible(4)}>
            <InnerDetails
              intro={intro}
              value={details?.college}
              header={"College"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938972/icons/studies_yawfuz.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div className="currentCity" onClick={() => setVisible(5)}>
            <InnerDetails
              intro={intro}
              value={details?.currentCity}
              header={"Current City"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938922/icons/home_wdq8jq.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div className="hometown" onClick={() => setVisible(6)}>
            <InnerDetails
              intro={intro}
              value={details?.hometown}
              header={"Current City"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938922/icons/home_wdq8jq.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div className="relationship" onClick={() => setVisible(7)}>
            <InnerDetails
              intro={intro}
              value={details?.relationship}
              header={"Relationship"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938969/icons/relationship_c7bpox.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
              rel
            />
          </div>
          <div className="instagram" onClick={() => setVisible(8)}>
            <InnerDetails
              intro={intro}
              value={details?.instagram}
              header={"Instagram"}
              img={
                "https://res.cloudinary.com/dbmrpcjnf/image/upload/v1721938959/icons/instagram_helgjd.png"
              }
              handleBio={handleBio}
              handleUpdatedBio={handleUpdatedBio}
              showBio={showBio}
              visible={visible}
              setVisible={setVisible}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
