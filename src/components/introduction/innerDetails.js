import { useState } from "react";
import Bio from "./bio";
const InnerDetails = ({
  value,
  img,
  header,
  setShowBio,
  handleBio,
  handleUpdatedBio,
  showBio,
  visible,
  setVisible,
  loading,
  setLoading,
  intro,
  rel,
}) => {
  const [showNic, setShowNic] = useState(false);
  return (
    <div>
      {value ? (
        <div className="value_block">
          <div className="value">
            <img src={img} alt="" />
            {header}: {value}
          </div>
          <div
            className="edit"
            onClick={() => {
              setShowNic(true);
            }}
          >
            <i className="edit_icon"></i>
          </div>
        </div>
      ) : (
        <div className="general_Details">
          <span>{header}</span>
          <div
            className="inner filter_blue"
            onClick={() => {
              setShowNic(true);
            }}
          >
            <i className="rounded_plus_icon"></i>
            <span>Add {header}</span>
          </div>
        </div>
      )}

      {visible === 1 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="otherName"
          placeholder="Other Name"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}

      {visible === 2 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="job"
          placeholder="job Title"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {visible === 3 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="workplace"
          placeholder="Work Place"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {visible === 4 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="college"
          placeholder="College"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {visible === 5 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="currentCity"
          placeholder="Current City"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {visible === 6 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="hometown"
          placeholder="Hometown"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {visible === 7 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="relationship"
          placeholder="Relationship"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
          rel={rel}
        />
      )}
      {visible === 8 && showNic && (
        <Bio
          intro={intro}
          setShowBio={setShowBio}
          handleBio={handleBio}
          handleUpdatedBio={handleUpdatedBio}
          name="instagram"
          placeholder="Instagram"
          setShowNic={setShowNic}
          showNic={showNic}
          showBio={showBio}
          setVisible={setVisible}
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default InnerDetails;
