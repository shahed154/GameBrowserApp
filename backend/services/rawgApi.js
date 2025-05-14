

import axios from 'axios';
import Game from '../models/Game.js';
import dotenv from 'dotenv';


dotenv.config();

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api"


// GAMES LIST


export const getGames = async (params = {}) => 
{
  try 
  {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        page_size: 20,
        ...params
      }
    });
    
    return response.data.results
  } catch (error) {
    console.error("Error getting games from RAWG:", error);
    throw new Error(`Failed to get games`)
  }
};

// GAME DETAilS

export const getGameDetails = async (gameId) => {
  try 
  {
    const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
      params: { key: API_KEY }
    })
    
    const screenshotsResponse = await axios.get(`${BASE_URL}/games/${gameId}/screenshots`, {
      params: { key: API_KEY }
    });
    
    return {
      ...response.data,
      screenshots: screenshotsResponse.data.results
    }
  } catch (error) {
    console.error(`Error getting game details for ID ${gameId}:`, error);
    throw new Error("Failed to get game details");
  }
};