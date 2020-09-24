

// function validateUsername(username) {
//   var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(username).toLowerCase());
// }


const setAdminLogin = (username, password, admins) => {
  let adminIndex = "";
  for(let i = 0; i < admins.length; i++) {
    if(username === admins[i].username && password === admins[i].password) {
      adminIndex = i;
      return adminIndex;
    }
  }
  return adminIndex;
};


// const setErrors = (username, password) => {
//   let errors = { username: "", password: "" };
//   if (!username && username.length === 0) {
//     errors.username = "Email is required";
//   } else if (!validateUsername(username)) {
//     errors.username = "Email is invalid";
//   }
//   if (!password && password.length === 0) {
//     errors.password = "Password is required";
//   } else if (password.length < 8) {
//     errors.password = "Password must have 8 characters";
//   }
//   return errors;
// };


const initialState = {
  login: {
    username: "",
    password: "",
    adminIndex: "" //index in the admins array
  },
  admins: [],
  //blogPosts: []
}


//I think this is the function that responds to the props.dispatch method
//that is associated with a pages event trigger, in the case of LoginForm.js
//the Submit button onClick handler (maybe it is better to associate the event 
//handler with the form itself, so that pressing Enter would also trigger the method.


//TODO figure out a way to move everything in this file
export default (state = initialState, action) => {

  if (action.type === "ADMIN_RETRIEVE") {
    const { adminList } = action.payload;
    const newState = { ...state,
      admins: adminList,  
    }
    return newState;
  }
  else if (action.type === "FORM_SUBMIT") {
    const { username, password } = action.payload;
    
    // get the index of the admin in admins[] if username and password match
    const adminIndex = setAdminLogin(username, password, state.admins); 
    const loginMessage = adminIndex !== "" ? "You are logged in as an administrator" : "Your login credentials did not match an administrator";
    
    const login = {
      username: username,
      password: password,
      loginMessage: loginMessage,
      adminIndex: adminIndex,
    };
    
    const newState = { ...state,
      login: login
    };

    return newState;
  }

  // else if(action.type === "POPULATE_BLOGPOSTS") {
    
  //   const newPosts = action.payload;
  //   const newState = { ...state,
  //     blogPosts: newPosts
  //   }

  //   return newState;

  // }

  return state;

};