export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";
export const GET_PERSONAL_PROFILE = "GET_PERSONAL_PROFILE";
export const LOGOUT_USER = "LOGOUT_USER";
export const CREATE_LOO = "CREATE_LOO";

export const fetchCreateUser = (newUser) => {
  return async (dispatch) => {
    const body = JSON.stringify(newUser);
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    dispatch({ type: CREATE_USER, payload: data });
  };
};

export const fetchLoginUser = (user) => {
  return async (dispatch) => {
    const body = JSON.stringify(user);
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    dispatch({ type: LOGIN_USER, payload: data });
    localStorage.setItem("accessToken", data.accessToken);
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

export const fetchPersonalLoos = (loo) => {
  return async (dispatch) => {
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
        dispatch({ type: CREATE_LOO, payload: data });
      } else {
        throw new Error("Error in creation loo");
      }
    } catch (err) {
      console.log(err);
    }
  };
};
