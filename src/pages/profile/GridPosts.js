const GridPosts = () => {
  return (
    <div className="create_post">
      <div className="grid_post_header">
        <div className="left_grid">Posts</div>
        <div className="right_grid">
          <div className="gray_btn">
            <i className="equalize_icon"></i>
            <span>Filters</span>
          </div>
          <div className="gray_btn">
            <i className="manage_icon"></i>
            <span>Manage Posts</span>
          </div>
        </div>
      </div>
      <div className="post_splitter"></div>
      <div className="grid_post_body">
        <div className="grid_list active">
          <i className="list_icon filter_blue"></i>
          List view
        </div>
        <div className="grid_view">
          <i className="grid_icon"></i>
          Grid view
        </div>
      </div>
    </div>
  );
};

export default GridPosts;
