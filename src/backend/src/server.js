const app = require("./app"); // Import the app instance
const PORT = process.env.PORT || 8923;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
