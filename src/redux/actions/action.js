export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export const GET_PERSONAL_PROFILE = "GET_PERSONAL_PROFILE";

export const CREATE_LOO = "CREATE_LOO";
export const CREATE_LOO_REQUEST = "CREATE_LOO_REQUEST";
export const CREATE_LOO_SUCCESS = "CREATE_LOO_SUCCESS";
export const CREATE_LOO_FAILURE = "CREATE_LOO_FAILURE";
export const RESET_LOADED = "RESET_LOADED";
export const GET_LOCATION = "GET_LOCATION";
export const GET_MY_LOO = "GET_MY_LOO";
export const DELETE_LOO = "DELETE_LOO";

export const GET_LOO_BY_ID = "GET_LOO_BY_ID";
export const GET_LOO_BY_ID_REQUEST = "GET_LOO_BY_ID_REQUEST";
export const CHANGE_LOO_STATE = "CHANGE_LOO_STATE";
export const CHANGE_LOO_IMAGE = "CHANGE_LOO_IMAGE";
export const CHANGE_LOO_IMAGE_REQUEST = "CHANGE_LOO_IMAGE_REQUEST";
export const CHANGE_LOO_IMAGE_FAILURE = "CHANGE_LOO_IMAGE_FAILURE";
export const CHANGE_LOO_DETAILS = "CHANGE_LOO_DETAILS";
export const CHANGE_LOO_DETAILS_REQUEST = "CHANGE_LOO_DETAILS_REQUEST";
export const CHANGE_LOO_DETAILS_FAILURE = "CHANGE_LOO_DETAILS_FAILURE";

export const GET_NEARBY_LOO = "GET_NEARBY_LOO";

export const fetchCreateUser = (newUser) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });
    const body = JSON.stringify(newUser);
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: CREATE_USER, payload: data });
      } else {
        const errorData = await response.json();
        dispatch({ type: CREATE_USER_FAILURE, payload: errorData });
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const actionCreateUserSuccess = () => {
  return { type: CREATE_USER_SUCCESS };
};

export const fetchLoginUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    const body = JSON.stringify(user);
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        const data = await response.json();

        dispatch({ type: LOGIN_USER, payload: data });
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        const errorData = await response.json();
        dispatch({ type: LOGIN_USER_FAILURE, payload: errorData });
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchPersonalProfile = () => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_PERSONAL_PROFILE,
          payload: data,
        });
      } else {
        throw new Error(`Error in fetch - ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutAction = () => {
  localStorage.setItem("accessToken", "");
  return {
    type: LOGOUT_USER,
  };
};

export const fetchDeleteUser = () => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    try {
      let response = await fetch("http://localhost:3001/users/me", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        dispatch({ type: LOGOUT_USER });
      } else {
        throw new Error("Error in delete user");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchCreateLoos = (loo) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_LOO_REQUEST });
    const body = JSON.stringify(loo);
    let token = localStorage.getItem("accessToken");
    try {
      let response = await fetch("http://localhost:3001/users/me/loos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: body,
      });

      if (response.ok) {
        let data = await response.json();
        console.log(data);
        dispatch({ type: CREATE_LOO, payload: data });
        dispatch({ type: CREATE_LOO_SUCCESS });
      } else {
        dispatch({ type: CREATE_LOO_FAILURE });
        throw new Error("Error in creation loo");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const resetLoadedLooCreated = () => {
  return {
    type: RESET_LOADED,
  };
};

export const fetchGetLocation = (inputValue) => {
  return async (dispatch) => {
    const token = import.meta.env.VITE_API_TOKEN;
    try {
      let response = await fetch(
        `/api/v1/forward?access_key=` +
          token +
          `&query=` +
          inputValue +
          `&country_module=1`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        let data = await response.json();
        dispatch({ type: GET_LOCATION, payload: data });
      } else {
        throw new Error("Error in getting location");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchGetMyLoo = () => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    try {
      let response = await fetch("http://localhost:3001/loos/myLoos", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_MY_LOO,
          payload: data,
        });
      } else {
        throw new Error("Error in getting personal loo");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchDeleteLoo = (looId) => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    try {
      let response = await fetch("http://localhost:3001/loos/myLoos/" + looId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        dispatch({ type: DELETE_LOO, payload: looId });
      } else {
        throw new Error("Error in delete loo");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchLooById = (looId) => {
  return async (dispatch) => {
    dispatch({ type: GET_LOO_BY_ID_REQUEST });
    let token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:3001/loos/" + looId, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: GET_LOO_BY_ID, payload: data });
      } else {
        throw new Error("Error in getting loo by id");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchChangeLooState = (looId) => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:3001/loos/myLoos/" + looId + "/changeState",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: CHANGE_LOO_STATE, payload: data });
      } else {
        throw new Error("Error in changing loo state");
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchChangeLooImage = (looId, file) => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    dispatch({ type: CHANGE_LOO_IMAGE_REQUEST });
    let formData = new FormData();
    formData.append("looImage", file);
    try {
      let response = await fetch(
        "http://localhost:3001/loos/myLoos/" + looId + "/looImage",
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: CHANGE_LOO_IMAGE, payload: data });
      } else {
        const errorData = await response.json();
        dispatch({ type: CHANGE_LOO_IMAGE_FAILURE, payload: errorData });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchChangeLooDetails = (looId, updatedLoo) => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    const body = JSON.stringify(updatedLoo);
    dispatch({ type: CHANGE_LOO_DETAILS_REQUEST });
    try {
      let response = await fetch(
        "http://localhost:3001/loos/myLoos/" + looId + "/details",
        {
          method: "PUT",
          body: body,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({ type: CHANGE_LOO_DETAILS, payload: data });
      } else {
        dispatch({ type: CHANGE_LOO_DETAILS_FAILURE });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchGetNearbyLoo = (latPrefix, longPrefix) => {
  return async (dispatch) => {
    let token = localStorage.getItem("accessToken");
    try {
      let response = await fetch(
        "http://localhost:3001/loos/searchByPosition?latPrefix=" +
          latPrefix +
          "&longPrefix=" +
          longPrefix,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("loos nearby fetch: " + JSON.stringify(data));
        dispatch({ type: GET_NEARBY_LOO, payload: data });
      } else {
        throw new Error("No loos found nearby current position");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
