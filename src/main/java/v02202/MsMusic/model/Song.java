package v02202.MsMusic.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.*;

import lombok.Data;


@Document
@Data
public class Song {
	
	@Id
	private String song_id;
		
	private String fileName;
	private String title;
	private String artist;
	private boolean favorite;
	private String addBy;
	// public String getTitle() {
	// 	// TODO Auto-generated method stub
	// 	throw new UnsupportedOperationException("Unimplemented method 'getTitle'");
	// }
    // public String getSongFileNames() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'getSongFileNames'");
    // }
}
