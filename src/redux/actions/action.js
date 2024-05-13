export const CREATE_USER = "CREATE_USER";
export const LOGIN_USER = "LOGIN_USER";

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
