package v02202.MsMusic.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.PostExchange;
import org.springframework.ui.Model;

import v02202.MsMusic.model.Song;
import v02202.MsMusic.repository.SongRepository;
import v02202.MsMusic.services.StorageService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/songs")
public class SongController {
    private final StorageService storageService;
    private final SongRepository songRepository;

    @Autowired
    public SongController(StorageService storageService, SongRepository songRepository){
        this.storageService = storageService;
        this.songRepository = songRepository ;
        
    }


    @GetMapping("/user_id={user_id}")
    public ResponseEntity<List<Song>> getSong(@PathVariable String user_id){
        // Song song = new Song();
        // List<Song> songList = songRepository.findAll(song.getAddBy().equals(song));
        
        List<Song> songList = songRepository.findByAddBy(user_id);
        return ResponseEntity.ok(songList);
    }

    @GetMapping("/{song_id}")
    public ResponseEntity<Song> getSingleSong(@PathVariable String song_id){
        
        Optional<Song> songOptional = songRepository.findById(song_id);
        if (songOptional.isPresent()){
            Song song = songOptional.get();
            return ResponseEntity.ok(song);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/user_id={user_id}")
    public ResponseEntity<?> addSong(@PathVariable String user_id, @RequestPart("file")MultipartFile file) throws IOException{
        System.out.println(user_id + " " +file.getOriginalFilename());
        if (songRepository.existsSongByFileNameEquals(file.getOriginalFilename())){
            return ResponseEntity.badRequest().body("already taken");
        } else {
            System.out.println("ploading the file....");
            storageService.uploadSong(file);
            //saving the song data into the db
            Song song = new Song();
            song.setAddBy(user_id);
            song.setFileName(file.getOriginalFilename());
            Song insertedSong = songRepository.insert(song);
        
            
            return new ResponseEntity<>(insertedSong, HttpStatus.CREATED);
        }
         
    }


    @PutMapping("/{id}")
    public ResponseEntity<Song> putSong(@PathVariable String id, @RequestBody Song songData){
        Optional<Song> songOptional = songRepository.findById(id);
        if(songOptional.isPresent()){          
            Song song = songOptional.get();
            if(songData.getTitle() != null){
                song.setTitle(songData.getTitle());
            };
            if(songData.getArtist() != null){
                song.setArtist(songData.getArtist());
            };
            song.setFavorite(songData.isFavorite());
            
            Song updatedSong = songRepository.save(song);
            return ResponseEntity.ok(updatedSong);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Song> deleteSong(@PathVariable String id){
        if(songRepository.existsById(id)){
            songRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else{
            return ResponseEntity.notFound().build(); 
        }
    }

}
