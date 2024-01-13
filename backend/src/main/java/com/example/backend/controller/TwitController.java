package com.example.backend.controller;


import com.example.backend.dto.TwitDto;
import com.example.backend.dto.mapper.TwitDtoMapper;
import com.example.backend.exception.TwitException;
import com.example.backend.exception.UserException;
import com.example.backend.model.Twit;
import com.example.backend.model.User;
import com.example.backend.request.TwitReplyReques;
import com.example.backend.response.ApiResponse;
import com.example.backend.service.TwitService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tweets")
public class TwitController {

    @Autowired
    private TwitService twitService;

    @Autowired
    private UserService userService;


    @PostMapping("/create/tweet")
    public ResponseEntity<TwitDto> createTwit(@RequestBody Twit req,
                                              @RequestHeader("Authorization") String jwt) throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);

        Twit twit = twitService.createTwit(req, user);

        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }



    @PutMapping("/tweet/{id}")
    public ResponseEntity<TwitDto> editTwit(@PathVariable("id") Long id,
                                            @RequestBody Twit req,
                                            @RequestHeader("Authorization") String jwt) throws UserException, TwitException {

        User user = userService.findUserProfileByJwt(jwt);

        Twit twit = twitService.editTwit(id, req, user);

        TwitDto twitDto = TwitDtoMapper.toTwitDto(twit, user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }




    @PostMapping("/tweet")
    public ResponseEntity<TwitDto> replyTwit(@RequestBody TwitReplyReques req,
                                              @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        Twit twit= twitService.createdReply(req,user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }


    @PutMapping("/retwit/{twitId}")
    public ResponseEntity<TwitDto> retwit(@PathVariable Long twitId,
                                             @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        Twit twit= twitService.retwit(twitId,user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }



    @DeleteMapping("/{twitId}")
    public ResponseEntity<ApiResponse> deleteTwit(@PathVariable Long twitId,
                                          @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        twitService.deleteTwitById(twitId,user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Twit delete succesful");
        res.setStatus(true);




        return new ResponseEntity<>(res, HttpStatus.OK);
    }



    @GetMapping("/{twitId}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable Long twitId,
                                                @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        Twit twit= twitService.findById(twitId);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }


    @GetMapping("/all")
    public ResponseEntity<List<TwitDto>> getAllTwits(
                                                @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        List<Twit> twits= twitService.findAllTwit();

        List<TwitDto> twitDtos= TwitDtoMapper.toTwitDtos(twits,user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUsersAllTwits( @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        List<Twit> twits= twitService.getUserTwit(user);

        List<TwitDto> twitDtos= TwitDtoMapper.toTwitDtos(twits,user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }


    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikesContainesUser ( @PathVariable Long userId,
                                                           @RequestHeader("Authorization") String jwt) throws UserException, TwitException{

        User user = userService.findUserProfileByJwt(jwt);

        List<Twit> twits= twitService.findByLikesContainsUser(user);

        List<TwitDto> twitDtos= TwitDtoMapper.toTwitDtos(twits,user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }



}
