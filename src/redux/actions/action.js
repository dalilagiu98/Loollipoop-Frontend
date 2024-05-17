export const CREATE_USER = "CREATE_USER";
export const CREATE_USER_REQUEST = "CREATE_USER_REQUEST";
export const CREATE_USER_FAILURE = "CREATE_USER_FAILURE";

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const GET_PERSONAL_PROFILE = "GET_PERSONAL_PROFILE";
export const LOGOUT_USER = "LOGOUT_USER";
export const CREATE_LOO = "CREATE_LOO";
export const CREATE_LOO_REQUEST = "CREATE_LOO_REQUEST";
export const CREATE_LOO_SUCCESS = "CREATE_LOO_SUCCESS";
export const CREATE_LOO_FAILURE = "CREATE_LOO_FAILURE";
export const RESET_LOADED = "RESET_LOADED";
export const GET_LOCATION = "GET_LOCATION";
export const GET_MY_LOO = "GET_MY_LOO";

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
        dispatch({ type: CREATE_USER_FAILURE });
        throw new Error("Network response was not ok");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
    try {
      let token = localStorage.getItem("accessToken");
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

export const fetchCreateLoos = (loo) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_LOO_REQUEST });
    const body = JSON.stringify(loo);
    const token = localStorage.getItem("accessToken");
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
    const token = localStorage.getItem("accessToken");
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
