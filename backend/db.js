import mongoose from 'mongoose';

// DATABASE CONNECTION

export const connectDB = async () => 
{
  try 
  {

    const connection = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MONGODB CONNECTED: ${connection.connection.host}`);

  } 
  catch (error)
   {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}