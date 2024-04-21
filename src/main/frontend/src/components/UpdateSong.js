import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import SongService from '../services/SongService';

export const UpdateSong = () => {
    const { songId } = useParams();
    const [singleSong, setSingleSong] = useState({
    });

    const [updateSong, setUpdateSong] = useState({
    })

    useEffect(() => {
        
        SongService.getSingleSongList(songId)
        .then((response) => {
            setSingleSong(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    

    const handleChange = (e) => {
        const value = e.target.value;
        console.log("e.target.favorite"+e.target.checked)
        setUpdateSong({...updateSong, 
            [e.target.name]:value,
            favorite: e.target.checked
        });
    }

    const saveUpdateSong = (e) => {
        // prevent page reload
        e.preventDefault();
        console.log("update song .... "+songId)
        SongService.updateSong(JSON.stringify(updateSong), songId).then((response) => {
            if (response.status === 200) {
                window.location = "/song" 
            }
        }).catch((error) => {
            console.log(error);
        })
    }    

    

  return (
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <form class=" max-w-md mx-auto">
            <div>
                <div class="relative z-0 w-full mb-5 group">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">File name</label>
                    <input type="text" id="disabled-input" aria-label="disabled input" class="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={singleSong.fileName} disabled />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Title</label>
                    <input 
                        onChange={(e)=> handleChange(e)}
                        type="title" 
                        id="title" 
                        name="title" 
                        value={updateSong.title} 
                        placeholder={singleSong.title} 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                </div>
                <div class="relative z-0 w-full mb-5 group">
                    <label for="artist" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-900">Artist</label>
                    <input 
                        type="artist" 
                        id="artist" 
                        name="artist"
                        onChange={(e)=> handleChange(e)}
                        value={updateSong.artist} 
                        placeholder={singleSong.artist} 
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"  />
                </div>
                <div className="mb-[0.2rem] block min-h-[1.5rem] pl-[1.5rem]">
                    
                    <input  
                        name="favorite"
                        id="checked-checkbox" 
                        type="checkbox" 
                        value={updateSong.favorite} 
                        defaultChecked={singleSong.favorite}
                        onChange={(e)=> handleChange(e)}
                        class="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is favorite</label>
                    
                    {/* <input
                        className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid"
                        type="checkbox"
                        id="favorite"
                        name="favorite"
                        checked
                        // defaultChecked="true"
                        onChange={(e)=> handleChange(e)}
                        
                    /> */}
                    
                    {/* <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxChecked">
                    </label> */}
                </div>
                
                
                
            </div>
            
        
        <button 
            type="submit" 
            onClick={saveUpdateSong}
            defaultChecked={updateSong.favorite}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>



        
        
    </div>

  )
}
