import mongoose from "mongoose";

const db_uri: string = process.env.MONGODB_URI as string;
const db_conection = async () => {
  try {
    if (db_uri) {
      await mongoose.connect(db_uri);
      console.log("DB connected");
      return;
    }
    return console.log("provide a valid mongodb url");
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

export default db_conection;
