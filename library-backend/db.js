const { mongoose } = require('mongoose');

mongoose.set('strictQuery', false);

const connectToDatabase = async (uri) => {
  console.log(`connecting to database URI: ${uri}`);

  try {
    await mongoose.connect(uri);
    console.log('connnected to MongoDB');
  } catch (error) {
    console.log(`error connnection to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
