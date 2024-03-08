import { useRef } from "react";

const AddImages = ({ images, setImages, setShowPrev }) => {
  const imageInputRef = useRef(null);
  const handleImage = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow_a scrollbar">
      <div className="add_pics_wrap">
        <input
          type="file"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImage}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 extra_styling">
            <div className="inside_with_pics">
              <div className="edit_pics hover2">
                <i className="edit_icon"></i>
                <span>Edit</span>
              </div>
              <div
                className="select_pics hover2"
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                <span>Add Photos/Videos</span>
              </div>
            </div>

            <div
              className="small_circle_white"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "prev1"
                  : images.length === 2
                  ? "prev2"
                  : images.length === 3
                  ? "prev3"
                  : images.length === 4
                  ? "prev4"
                  : images.length === 5
                  ? "prev5"
                  : images.length % 2 === 0
                  ? "prev6-1"
                  : "prev6-2"
              }
            >
              {images.map((image, i) => (
                <img src={image} key={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1">
            <div
              className="small_circle_white"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
        <div className="add_pics_inside2">
          <div className="left_post_phone">
            <div className="add_circle">
              <i className="phone_icon"></i>
            </div>
            <div className="mobile_text">
              Add photos from your mobile device.
            </div>
          </div>
          <span className="add_phone_btn">Add</span>
        </div>
      </div>
    </div>
  );
};

export default AddImages;
