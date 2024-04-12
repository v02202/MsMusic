package v02202.MsMusic.model;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Users {
    @Id
    private String user_id;

    private String userName;
    private String email;
    private String password;
}
