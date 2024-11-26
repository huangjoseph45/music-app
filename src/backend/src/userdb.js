const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

const uri = process.env.DATABASE_CONNECTION_URI;

async function addAccount(
  username,
  password,
  email = undefined,
  playlists = []
) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("userdb");
    const collection = db.collection("users");

    const userExists = await collection.findOne({ name: username });
    if (userExists) {
      return { status: 409, message: "Username already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await collection.insertOne({
      name: username,
      password: hashedPassword,
      email: email,
      playlists: playlists,
    });

    console.log(`Document inserted with _id: ${result.insertedId}`);
    return { status: 200, userId: result.insertedId };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, error: "Internal server error" };
  } finally {
    await client.close();
  }
}

async function deleteAccount(username, password) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("userdb");
    const collection = db.collection("users");

    const user = await collection.findOne({ name: username });
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { status: 404, message: "User not found" };
    }

    const result = await collection.deleteOne({ _id: user._id });
    if (result.deletedCount === 1) {
      console.log(`Successfully deleted account with _id: ${user._id}`);
      return { status: 200, message: "Account deleted" };
    } else {
      return { status: 500, message: "Failed to delete account" };
    }
  } catch (error) {
    console.error("Error deleting account:", error);
    return { status: 500, error: "Internal server error" };
  } finally {
    await client.close();
  }
}

async function findAccount(username, password) {
  console.log(uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("userdb");
    const collection = db.collection("users");
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const user = await collection.findOne({ name: username });
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { status: 404, message: "User not found" };
    }

    return {
      status: 200,
      message: "User successfully authorized",
      content: {
        email: user.email,
        name: user.name,
        password: user.password,
        playlists: user.playlists,
      },
    };
  } catch (error) {
    console.error("Error finding account: ", error);
    return { status: 500, error: "Internal server error" };
  } finally {
    await client.close();
  }
}

async function updateAccount(user) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("userdb");
    const collection = db.collection("users");
    await db.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    console.log("update account");
    const { name, password, playlists, email } = user;
    const response = await collection.updateOne(
      { password: password },
      {
        $set: { name: name, playlists: playlists, email: email },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating account: ", error);
    return { status: 500, error: "Internal server error" };
  } finally {
    await client.close();
  }
}

module.exports = {
  addAccount,
  deleteAccount,
  findAccount,
  updateAccount,
};
