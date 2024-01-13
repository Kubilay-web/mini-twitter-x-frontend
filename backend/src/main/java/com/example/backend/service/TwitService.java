package com.example.backend.service;

import com.example.backend.exception.TwitException;
import com.example.backend.exception.UserException;
import com.example.backend.model.Twit;
import com.example.backend.model.User;
import com.example.backend.request.TwitReplyReques;

import java.util.List;

public interface TwitService {




    public Twit createTwit(Twit req,User user) throws UserException;
    public List<Twit> findAllTwit();

    public Twit retwit(Long twitId,User user) throws UserException, TwitException;

    public Twit findById(Long twitId) throws TwitException;

    public void deleteTwitById(Long twitId,Long userId) throws TwitException,UserException;

    public Twit removeFromReTwit(Long twitId,User user) throws TwitException,UserException;

    public Twit createdReply(TwitReplyReques req, User user) throws TwitException;

    public List<Twit> getUserTwit(User user);

    public List<Twit> findByLikesContainsUser(User user);


   public Twit editTwit(Long id, Twit req, User user);
}
