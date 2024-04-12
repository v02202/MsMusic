package v02202.MsMusic.services;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ListObjectsV2Result;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;

@Service
public class StorageService {
	
	private final AmazonS3 space;

	private String accessKey;
	private String secretKey;
	
	@Autowired
	public StorageService(@Value("${aws.iam.access.key}") String accessKey, @Value("${aws.iam.secret.key}") String secretKey) {
		this.accessKey = accessKey;
		this.secretKey = secretKey;
		AWSCredentials awsCredentials =
                new BasicAWSCredentials(this.accessKey, this.secretKey);
		

		
		
		space = AmazonS3ClientBuilder
				.standard()
				.withRegion(Regions.AP_NORTHEAST_1)
				.withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
				.build();
	}
	
	public List<String> getSongFileNames(){
		ListObjectsV2Result result = space.listObjectsV2("msmusicbucket");
		List<S3ObjectSummary> objects = result.getObjectSummaries();
		
		return objects.stream()
			.map(s3ObkectSummary -> {
				return s3ObkectSummary.getKey();
			}).collect(Collectors.toList());
		
	} 
	
	public void uploadSong(MultipartFile file) throws IOException{
		ObjectMetadata objectMetaData = new ObjectMetadata();
		objectMetaData.setContentType(file.getContentType());
		space.putObject(new PutObjectRequest(
				"msmusicbucket",
				file.getOriginalFilename(),
				file.getInputStream(),
				objectMetaData).withCannedAcl(CannedAccessControlList.PublicRead ));
	}
	
}
