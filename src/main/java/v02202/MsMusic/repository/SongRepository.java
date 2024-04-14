package v02202.MsMusic.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import v02202.MsMusic.model.Song;


public interface SongRepository extends MongoRepository <Song, String> {
	// Extends MongoRepository, already inherited all the CRUD functions
	boolean existsSongByFileNameEquals(String fileName);
	boolean existsSongByTitleEquals(String title);
	List<Song> findByAddBy(String addBy);
}
