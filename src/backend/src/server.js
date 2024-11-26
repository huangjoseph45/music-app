const app = require("./app"); // Import the app instance
const PORT = process.env.REACT_APP_PORT || 8923;
require("dotenv").config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
