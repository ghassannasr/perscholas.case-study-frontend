// const initialState = {
//   loginForm: {
//     values: {
//       email: "",
//       password: ""
//     },
//     errors: {
//       email: "",
//       password: ""
//     }
//   }
// };

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
export default (state ={}, action) => {

  console.log("REDUCER CALLED");
  console.log(JSON.stringify(state));

  if (action.type === "FORM_SUBMIT") {
    console.log("In the reducer" + action.payload.email)
    const { email, password } = action.payload;
    const values = {
      email,
      password
    };
    const errors = setErrors(email, password); // validate fields
    console.log("Spread operator " + JSON.stringify(state));
    const newState = { ...state,
      loginForm: {
        values,
        errors
      }
    };
    console.log("Spread operator after " + JSON.stringify(newState));
    return newState;
  }
  console.log("Calling a blank reducer:" + JSON.stringify(state));
  return state;
};