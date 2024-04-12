package v02202.MsMusic.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.ui.Model;
import v02202.MsMusic.services.StorageService;

@Controller
public class IndexController {

    private final StorageService storageService;
    @Autowired
    public IndexController(StorageService storageService){
        this.storageService = storageService;
    }

    @GetMapping
    public String getHomepage(Model model){
        List<String> songList = storageService.getSongFileNames();
        // System.out.println("Test ------------- "+songList);
        model.addAttribute("songFileNames", songList);
        return "index";
    }

    @PostMapping
    public String handleFileUpload(@RequestParam("file")MultipartFile file) throws IOException{
        if (!file.isEmpty()){
            storageService.uploadSong(file);
        }
        return "redirect:/";
    }
}
