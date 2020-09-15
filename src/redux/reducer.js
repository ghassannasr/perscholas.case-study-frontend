

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const setErrors = (email, password) => {
  let errors = { email: "", password: "" };
  if (!email && email.length === 0) {
    errors.email = "Email is required";
  } else if (!validateEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (!password && password.length === 0) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must have 8 characters";
  }
  return errors;
};

//I think this is the function that responds to the props.dispatch method
//that is associated with a pages event trigger, in the case of LoginForm.js
//the Submit button onClick handler (maybe it is better to associate the event 
//handler with the form itself, so that pressing Enter would also trigger the method)

//TODO figure out a way to move everything in this file
export default (state = {}, action) => {

  if (action.type === "FORM_SUBMIT") {
    const { email, password } = action.payload;
    const values = {
      email,
      password
    };
    const errors = setErrors(email, password); // validate fields
    const newState = { ...state,
      loginForm: {
        values,
        errors
      }
    };
    //console.log("Spread operator after " + JSON.stringify(newState));
    return newState;
  }
  //console.log("Calling a blank reducer:" + JSON.stringify(state));
  return state;
};