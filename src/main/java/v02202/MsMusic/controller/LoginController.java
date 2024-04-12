package v02202.MsMusic.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import v02202.MsMusic.model.Song;
import v02202.MsMusic.model.Users;
import v02202.MsMusic.repository.SongRepository;
import v02202.MsMusic.repository.UsersRepository;
import v02202.MsMusic.services.StorageService;

@CrossOrigin(origins = "*")
@Controller
public class LoginController {
    private final StorageService storageService;
    private final UsersRepository usersRepository;

    @Autowired
    public LoginController(StorageService storageService, UsersRepository usersRepository){
        this.storageService = storageService;
        this.usersRepository = usersRepository;
    }

    @GetMapping("/login")
    public String getLoginPage(){
        return "login";
    }

    // @PostMapping("/login")
    // public String handleLoginData(@RequestParam("users")Users users){
    //     System.out.println("email ------- "+users.getEmail());
    //     if(usersRepository.existsByEmailAndPassword(users.getEmail(), users.getEmail())){
    //         return "redirect:/";
    //     } else {
    //         return "redirect:/login";
    //     }
    // }

    @PostMapping("/api/login")
    public ResponseEntity<Users> postLoginData (@RequestBody Users users){
        if(usersRepository.existsByEmailAndPassword(users.getEmail(), users.getPassword())){
            Users userData = usersRepository.findByEmailAndPassword(users.getEmail(), users.getPassword());
            System.out.println("<------- login succeed ------>");
            return ResponseEntity.ok(userData);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/register")
    public ResponseEntity<Users> postregisterData (@RequestBody Users users){
        System.out.println("email ------- "+users.getEmail());
        if(usersRepository.existsByEmail(users.getEmail())){
            return ResponseEntity.badRequest().body(users);
        } else {
            usersRepository.insert(users);
            return ResponseEntity.ok(users);
        }
    }

    @PutMapping("/api/users/{id}")
    public ResponseEntity<Users> updateUsersData(@PathVariable String id, @RequestBody Users users){
        Optional<Users> usersOptional = usersRepository.findById(id);
        System.out.println("------ Found users: "+usersOptional.isPresent());
        if (usersOptional.isPresent()){
            String password = users.getPassword();
            String userName = users.getUserName();
            Users originUser = usersOptional.get();
            if (password != null){
                originUser.setPassword(password);
            }
            if (userName != null){
                originUser.setUserName(userName);
            }
            return ResponseEntity.ok(originUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<Users> getUserData(@PathVariable String id){
        Optional<Users> userData = usersRepository.findById(id);
        if (userData.isPresent()){
            return ResponseEntity.ok(userData.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/users")
    public ResponseEntity<List<Users>> getAllUserData(){
        List<Users> listUser = usersRepository.findAll();
        return ResponseEntity.ok(listUser);
    }
}
