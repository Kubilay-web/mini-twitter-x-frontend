package com.example.backend.service;

import com.example.backend.exception.TwitException;
import com.example.backend.exception.UserException;
import com.example.backend.model.Like;
import com.example.backend.model.Twit;
import com.example.backend.model.User;
import com.example.backend.repository.LikeRepository;
import com.example.backend.repository.TwitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImplementation implements LikeService {

   @Autowired
    private LikeRepository likeRepository;

   @Autowired
    private TwitService twitService;

   @Autowired
    private TwitRepository twitRepository;



    @Override
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException {

        Like islikeExist=likeRepository.isLikeExist(user.getId(),twitId);

        if(islikeExist != null){
            likeRepository.deleteById(islikeExist.getId());
            return islikeExist;
        }

        Twit twit=twitService.findById(twitId);

        Like like=new Like();
        like.setTwit(twit);
        like.setUser(user);

        Like savedLike=likeRepository.save(like);
        twit.getLikes().add(savedLike);
        twitRepository.save(twit);


        return savedLike;
    }

    @Override
    public List<Like> getAllLikes(Long twitId) throws TwitException {

        Twit twit=twitService.findById(twitId);
        List<Like> likes=likeRepository.findByTwitId(twitId);




        return null;
    }
}
