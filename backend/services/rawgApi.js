import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api"

// GAMES LIST - POPULAR GAMES FROM LAST __  DAYS
export const getGames = async (page = 1) => 
{
  try 
  {
   // checks 60 days ago or change for more days 
    let daysToCheck = 60;
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - daysToCheck)
    
    // had tio format dates as YYYY-MM-DD in order to get the API working
    // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd copied from this 
    const fromDate = thirtyDaysAgo.toISOString().split('T')[0]
    const toDate = today.toISOString().split('T')[0]
    
    const response = await axios.get(`${BASE_URL}/games`,
    {
      /// was planning to allow for multiple pages to go through more games, but not enoughj time to add
      params: {
        key: API_KEY,
        page: page,
        page_size: 20,
        dates: `${fromDate},${toDate}`, 
        ordering: '-added' 
      }
    });
    

   return response.data.results;
  } catch (error) {
    console.error("Error getting games from RAWG:", error)
    throw new Error(`Failed to get games`)
  }
};


// GAME DETAILS

export const getGameDetails = async (gameId) => {
  try 
  {
    const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
      params: { key: API_KEY }
    })
    
    const screenshotsResponse = await axios.get(`${BASE_URL}/games/${gameId}/screenshots`, {
      params: { key: API_KEY }
    })
    
    return {
      ...response.data,
      screenshots: screenshotsResponse.data.results
    }
  } catch (error) {
    console.error(`Error getting game details for ID ${gameId}:`, error)
    throw new Error("Failed to get game details")
  }
}