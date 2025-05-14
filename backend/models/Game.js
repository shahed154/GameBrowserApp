import mongoose from "mongoose"


const gameSchema = new mongoose.Schema(
{
    rawgId: 
    {
      type: Number,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    background_image: String,
    metacritic: Number,
    genres: [
      {
        id: Number,
        name: String
      }
    ],
    platforms: [
      {
        platform: 
        {
          id: Number,
          name: String
        }
      }
    ]
});

export default mongoose.model(`Game`, gameSchema)