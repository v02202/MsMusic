package v02202.MsMusic.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import v02202.MsMusic.model.Song;
import v02202.MsMusic.repository.SongRepository;
import v02202.MsMusic.services.StorageService;

@RestController
@RequestMapping("/api/songs")
public class SongController {
    private final StorageService storageService;
    private final SongRepository songRepository;

    @Autowired
    public SongController(StorageService storageService, SongRepository songRepository){
        this.storageService = storageService;
        this.songRepository = songRepository ;
        
    }

    @GetMapping
    public ResponseEntity<List<Song>> getSongs(){
        return ResponseEntity.ok(songRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Song> getSong(@PathVariable String id){
        Optional<Song> song = songRepository.findById(id);
        if(song.isPresent()){
            return ResponseEntity.ok(song.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createSong(@RequestPart("song")Song song, @RequestPart("file")MultipartFile file) throws IOException{
        if (songRepository.existsSongByFileNameEquals(file.getOriginalFilename()) || songRepository.existsSongByTitleEquals(song.getTitle())){
            return ResponseEntity.badRequest().body("taken");
        } else {
            System.out.println("ploading the file....");
            storageService.uploadSong(file);

            //saving the song data into the db
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
            }
            if(songData.getArtist() != null){
                song.setArtist(songData.getArtist());
            }
            songData.set_favorite(song.is_favorite());
            return ResponseEntity.ok(song);
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
