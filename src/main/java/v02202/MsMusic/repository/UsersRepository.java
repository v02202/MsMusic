package v02202.MsMusic.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import v02202.MsMusic.model.Users;

public interface UsersRepository extends MongoRepository <Users, String> {
    Boolean existsByEmailAndPassword(String email, String password);
    Boolean existsByEmail(String email);
    Users findByEmailAndPassword(String email, String password);
}
