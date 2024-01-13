package com.example.backend.controller;


import com.example.backend.dto.LikeDto;
import com.example.backend.dto.mapper.LikeDtoMapper;
import com.example.backend.exception.TwitException;
import com.example.backend.exception.UserException;
import com.example.backend.model.Like;
import com.example.backend.model.User;
import com.example.backend.service.LikeService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{twitId}/likes")
    public ResponseEntity<LikeDto> likeTwit(@PathVariable Long twitId,
                                            @RequestHeader("Authorization") String jwt) throws UserException, TwitException {

        User user=userService.findUserProfileByJwt(jwt);
        Like like=likeService.likeTwit(twitId,user);

        LikeDto likeDto= LikeDtoMapper.toLikeDto(like,user);

        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);
    }


    @PostMapping("/twit/{twitId}")
    public ResponseEntity <List<LikeDto>> getAllLikes (@PathVariable Long twitId,
                                                       @RequestHeader("Authorization") String jwt) throws UserException, TwitException {

        User user=userService.findUserProfileByJwt(jwt);
        List<Like> likes=likeService.getAllLikes(twitId);

        List<LikeDto> likeDtos= LikeDtoMapper.toLikeDtos(likes,user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }




}
