export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  
export function validateUsername(username) {
    let re = /^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    return re.test(username);
  };
  
  // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export function validatePassword(password) {
    let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };
  
export function validateSignupFields({
    username,
    email,
    password1,
    password2,
    checked,
  }) {
    if (username === "") {
      alert("Please fill username");
      return false;
    } else if (email === "") {
      alert("Please fill email");
      return false;
    } else if (password1 === "") {
      alert("Please fill password");
      return false;
    } else if (password2 === "") {
      alert("Please repeat password");
      return false;
    }
  
    /*
    ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
      └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
            │         │         │            │           no _ or . at the end
            │         │         │            │
            │         │         │            allowed characters
            │         │         │
            │         │         no __ or _. or ._ or .. inside
            │         │
            │         no _ or . at the beginning
            │
            username is 8-20 characters long
    */
    if (!validateUsername(username)) {
      alert("Please enter a valid username");
      return false;
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return false;
    } else if (password1 !== password2) {
      alert("Passwords must match");
      return false;
    } else if (!validatePassword(password1)) {
      alert("Please enter a valid password");
      return false;
    } else if (!checked) {
      alert("You must agree terms and conditions before continuing");
      return false;
    }
  
    return true;
  };

export function validateSigninFields({ email, password }) {
    if (email === "") {
      alert("Please fill email");
      return false;
    } else if (password === "") {
      alert("Please fill password");
      return false;
    }

    /*
    ^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
      └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
            │         │         │            │           no _ or . at the end
            │         │         │            │
            │         │         │            allowed characters
            │         │         │
            │         │         no __ or _. or ._ or .. inside
            │         │
            │         no _ or . at the beginning
            │
            username is 5-20 characters long
    */
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return false;
    } else if (!validatePassword(password)) {
      alert("Please enter a valid password");
      return false;
    }
    return true;
  };
  