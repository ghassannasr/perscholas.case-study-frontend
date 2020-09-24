

function validateUsername(username) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(username).toLowerCase());
}

const setErrors = (username, password) => {
  let errors = { username: "", password: "" };
  if (!username && username.length === 0) {
    errors.username = "Email is required";
  } else if (!validateUsername(username)) {
    errors.username = "Email is invalid";
  }
  if (!password && password.length === 0) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must have 8 characters";
  }
  return errors;
};


const initialState = {
  loginForm: {
    values: {
      username: "",
      password: ""
    },
    errors: {
      username: "",
      password: ""
    }
  },
  blogPosts: []
};


//I think this is the function that responds to the props.dispatch method
//that is associated with a pages event trigger, in the case of LoginForm.js
//the Submit button onClick handler (maybe it is better to associate the event 
//handler with the form itself, so that pressing Enter would also trigger the method.


//TODO figure out a way to move everything in this file
export default (state = initialState, action) => {

  if (action.type === "FORM_SUBMIT") {
    const { username, password } = action.payload;
    const values = {
      username,
      password
    };
    const errors = setErrors(username, password); // validate fields
    const newState = { ...state,
      loginForm: {
        values,
        errors
      }
    };

    return newState;

  }

  else if(action.type === "POPULATE_BLOGPOSTS") {
    
    const newPosts = action.payload;
    const newState = { ...state,
      blogPosts: newPosts
    }

    return newState;

  }

  return state;

};