const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const mongoDb = process.env.MONGO_DB;

const connect = async () => {
  try {
    const db = await mongoose.connect(mongoDb, {useNewUrlParser: true, useUnifiedTopology: true});
    const {name, host} = db.connection;
    console.log(`Database ${name} connected succesfully to ${host}`);
  } catch (error) {
    console.error('Database connection failed', error);
  }
};

module.exports = {connect};
