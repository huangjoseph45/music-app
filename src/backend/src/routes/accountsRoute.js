const express = require("express");
const { addAccount, findAccount, updateAccount } = require("../userdb.js");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { username, password, email, playlists } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const responseCode = await addAccount(username, password, email, playlists);

    if (responseCode.status === 409) {
      return res.status(409).json({ error: "Account already exists" });
    }

    return res.status(200).json({ message: "Account successfully created" });
  } catch (error) {
    console.error("Error adding account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const { username, password } = req.query;
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const response = await findAccount(username, password);

    if (response.status === 404) {
      return res.status(404).json({ error: "Account not found" });
    }

    return res
      .status(200)
      .setHeader("Content-Type", "application/json")
      .json(response);
  } catch (error) {
    console.error("Error finding   account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/update", async (req, res) => {
  try {
    const user = req.body;
    const response = await updateAccount(user);
    if (response.status === 404) {
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json({ message: "Account successfully updated" });
  } catch (error) {
    console.error("Error updating account:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
