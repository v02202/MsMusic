import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

class SongService{
    getSongList(userId){
        return axios.get(BACKEND_URL+`songs/user_id=${userId}`,
        );
    }

    getSingleSongList(songId){
        return axios.get(BACKEND_URL+`songs/${songId}`);
    }

    updateSong(editSong, songId){
        return axios.put(
            BACKEND_URL+`songs/${songId}`, editSong,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*"
                }
                
            }
        )
    }

    addSong(formData, userId){
        return axios.post(
            BACKEND_URL+`songs/user_id=${userId}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    }
}

export default new SongService();