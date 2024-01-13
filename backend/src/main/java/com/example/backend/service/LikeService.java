package com.example.backend.service;

import com.example.backend.exception.TwitException;
import com.example.backend.exception.UserException;
import com.example.backend.model.Like;
import com.example.backend.model.User;

import java.util.List;

public interface LikeService {
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException;

    public List<Like> getAllLikes(Long twitId) throws TwitException;


}
