import React from 'react'

export const Song = () => {


  
  return (
    <div class="text-center m-20 py-3 px-2">
      <h1 class="text-6xl font-extrabold text-white">Ms.Music welcome</h1>
      <div>
          <form method="POST" enctype="multipart/form-data" action="/">
              <label class="mx-2 text-white">File to Upload:</label>
              <input name="file" class="bg-black ring-1 ring-gray-800 text-white font-medium p-1 rounded-xl" type="file" />
              <button class="bg-black ring-1 ring-gray-800 text-white font-medium p-1 my-2 text-2xl rounded-xl hover:bg-white hover:text-black" type="submit">Upload File</button>
          </form>
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
                                Audio
                            </th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        {/* <tr th:each="fileName : ${songFileNames}">
                            <td th:text="${fileName}" class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                Casket
                            </td>
                            <td class="m-4 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <audio controls preload="auto" id="audio_player">
                                  <source th:src="${'https://msmusicbucket.s3.ap-northeast-1.amazonaws.com/'+fileName}" type="audio/mpeg">
                                    
                                </audio>
                            </td>
                        </tr> */}

                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    </div>
  )
}
