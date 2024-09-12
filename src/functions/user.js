import axios from "axios";
export const updateProf = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateProf`,
      { url },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const updatedCover = async (url, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/updateCover`,
      { url },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

export const addFriend = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(data)
    return "ok";
  } catch (error) {
    console.log(error)
    return error.response.data.message;
  }
};
