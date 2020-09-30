
const setAdminLogin = (username, password, admins) => {
  let adminIndex = "error";

  for (let i = 0; i < admins.length; i++) {
    if (username === admins[i].username && password === admins[i].password) {
      adminIndex = i;
      return adminIndex;
    }
  }
  return adminIndex;
};

const initialState = {
  login: {
    username: "",
    password: "",
    adminIndex: "", //index in the admins array
    loginMessage: ""
  },
  admins: [],
}

export default (state = initialState, action) => {

  if (action.type === "ADMIN_RETRIEVE") {
    const { adminList } = action.payload;
    const newState = {
      ...state,
      admins: adminList,
    }
    return newState;
  }
  else if (action.type === "FORM_SUBMIT") {
    const { username, password } = action.payload;

    // get the index of the admin in admins[] if username and password match
    const adminIndex = setAdminLogin(username, password, state.admins);
    const loginMessage = 
          adminIndex !== "" && adminIndex !== "error" 
          ? "Success! You are logged in as an administrator." 
          : "Your login credentials did not match those of an administrator";

    const login = {
      username: username,
      password: password,
      adminIndex: adminIndex,
      loginMessage: loginMessage,
    };

    const newState = {
      ...state,
      login: login
    };

    return newState;
  }
  else if (action.type === "LOG_OUT") {
    
    const newState = initialState;
    return newState;
  
  }

  return state;

};