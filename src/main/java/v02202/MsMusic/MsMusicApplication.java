package v02202.MsMusic;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.multipart.MultipartFile;
import v02202.MsMusic.repository.SongRepository;
import v02202.MsMusic.services.*;



@SpringBootApplication
public class MsMusicApplication {
	
//	@Autowired
//	private static SongRepository songRepository;

	public static void main(String[] args) {
		ApplicationContext context = (ApplicationContext) SpringApplication.run(MsMusicApplication.class, args);
		StorageService storageService =  context.getBean(StorageService.class);
		System.out.println(storageService.getSongFileNames()); 
		
	}
	

}
