import React, { useEffect, useState } from 'react'
import SongService from '../services/SongService';

export const Song = () => {
    const [song, setSong] = useState([]);
    const [editsong, setEditSong] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [file,  setFile] = useState([]);
    const [filename,  setFileName] = useState({});

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem('user_id')) //changed
        // console.log("get userid from localStorage"+userid);
        SongService.getSongList(userid)
        .then((response) => {
            setSong(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    const hanldeClick = (selectedRec) => {
        setSelectedData(selectedRec);
        setShowModal(true);
      };
    
    const hideModal = () => {
    setShowModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setEditSong({...editsong, [e.target.name]:value});
    }

    const updateSong = (e, song_id) => {
        // prevent page reload
        e.preventDefault();
        console.log("update song .... "+song_id)
        SongService.updateSong(JSON.stringify(editsong), song_id).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }    
    
    const formData = new FormData();
    const onFileChange = (event) => {
        
        setFile({ file: event.target.files[0] });
        setFileName({...filename, filename:event.target.files[0].name});
        console.log("filename ----- "+filename.filename)
        
        
        
        // console.log("load file .... "+file)
    };
    const handleFileUpload = (event) => {
        
        // get the selected file from the input
        // const { file } = state
        // const file = event.target.files[0];
        console.log('blob ---- '+ filename.filename)
        const blob = new Blob([file.file], {type: file.file.type});
        
        formData.append("file", blob, filename.filename)
        // create a new FormData object and append the file to it
        
        // formData.append("file", file);
        const userid = JSON.parse(localStorage.getItem('user_id'))
        SongService.addSong(formData, userid).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }


  
  return (
    <div class="text-center m-20 py-3 px-2">
      <div class="my-10 py-15">
            <label class="mx-2 text-white">File to Upload:</label>
            <input name="file" class="bg-black ring-1 ring-gray-800 text-white font-medium p-1 rounded-xl" type="file" onChange={onFileChange} />
            <button class="bg-black ring-1 ring-gray-800 text-white font-medium p-1 my-2 text-2xl rounded-xl hover:bg-white hover:text-black" onClick={(e) => handleFileUpload(e)}>Upload File</button>
      </div>
      
      <div class="flex flex-col">
        <div class="-my-2 oaverflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Song Name
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Artist
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Is favorite
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Audio
                            </th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Edit
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {song.map(item => (
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.fileName}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.artist}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{String(item.favorite)}</td>
                                    <td class="m-4 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <audio controls preload="auto" id="audio_player">
                                            <source src={`https://msmusicbucket.s3.ap-northeast-1.amazonaws.com/${item.fileName}`} type="audio/mpeg">
                                            </source>
                                        </audio>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {/* <button onClick={() => hanldeClick(item)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                        Edit
                                        </button> */}
                                        <button>
                                            <a href={`/song/${item.song_id}`} className="text-blue-400">Edit</a>
                                        </button>
                                    </td>  
                                    {showModal ? (
                                        <>
                                        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-60 outline-none focus:outline-none">
                                            <div className="relative w-auto my-6 mx-auto max-w-4xl">
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                                        <h3 className="text-xl font-medium text-gray-900">Edit {item.fileName}</h3>
                                                        <button
                                                            className="bg-transparent border-0 text-black float-right"
                                                            onClick={() => setShowModal(false)}
                                                        >
                                                        </button>
                                                    </div>
                                                    <div className="relative p-6 flex-auto">
                                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                                                        <label className="block text-black text-sm font-bold mb-1">
                                                        Title
                                                        </label>
                                                        <input name="title" value={editsong.title} onChange={(e)=> handleChange(e)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                                        <label className="block text-black text-sm font-bold mb-1">
                                                        Artist
                                                        </label>
                                                        <input name="artist" value={editsong.artist} onChange={(e)=> handleChange(e)} className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                                                        <input type="hidden" name="song_id" value={item.song_id} />
                                                    </form>
                                                    </div>
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                        type="button"
                                                        onClick={(e) => { updateSong(e, item.song_id); }}
                                                    >
                                                        Submit
                                                    </button>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </>
                                    ): null}  
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}
