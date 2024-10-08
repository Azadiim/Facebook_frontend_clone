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
    console.log(data);
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const cancelRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const follow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const unFollow = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/unFollow/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const acceptRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/acceptRequest/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};

export const unFriend = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/unFriend/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
export const deleteRequest = async (id, token) => {
  try {
    const { data } = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/deleteRequest/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return "ok";
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
