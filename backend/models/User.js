
import mongoose from "mongoose"

const userSchema = new mongoose.Schema
(
  {
  username: {
    type: String,
    required: true,
    unique: true
  },
  //////not being used YET
  //  email: {
  //    type: `String`,
  //    required: true,
  //    unique: true,

  //  },
  // password: {
  //   type: "String",
  //   required: true
  // },
////////

  likedGames: [{
    type: Number  
  }],
  dislikedGames: [{
    type: Number  
  }]

 }
)

export default mongoose.model("User", userSchema)