import React from "react";

const OtherDetails = ({ setOther }) => {
  return (
    <div className="blur">
      <div className="create_post_box pictureBox">
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
          <div className="general_Details">
            <span>Other Name</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add Other Name</span>
            </div>
          </div>
          <div className="general_Details">
            <span>Work</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add a job title</span>
            </div>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add a workplace</span>
            </div>
          </div>
          <div className="general_Details">
            <span>Education</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add a hightSchool</span>
            </div>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add a college</span>
            </div>
          </div>
          <div className="general_Details">
            <span>Current City</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add your current city</span>
            </div>
          </div>
          <div className="general_Details">
            <span>hometown</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add hometown</span>
            </div>
          </div>
          <div className="general_Details">
            <span>Relationship</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add your relationship if your want</span>
            </div>
          </div>
          <div className="general_Details">
            <span>Instagram</span>
            <div className="inner filter_blue">
              <i className="plus_icon"></i>
              <span>Add your instagram link</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
