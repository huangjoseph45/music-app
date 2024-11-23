let accounts = {
  Joseph: {
    password: "Huang",
  },
};

// Error Codes
// 0: account added successfully
// 1: account verified
// 2: account already exists
// 3: no account found
// 4: miscellaneous error

const addAccount = (username, password) => {
  if (accounts[username] !== undefined) {
    return 2;
  } else {
    accounts[username] = { password: password };
    return 0;
  }
};

const checkAccount = (username, password) => {
  if (
    accounts[username] !== undefined &&
    accounts[username].password === password
  ) {
    console.log("account exists");
    return 1;
  } else {
    return 3;
  }
};

export { addAccount, checkAccount };
