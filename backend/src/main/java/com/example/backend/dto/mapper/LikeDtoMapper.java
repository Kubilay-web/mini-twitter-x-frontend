package com.example.backend.dto.mapper;

import com.example.backend.dto.LikeDto;
import com.example.backend.dto.TwitDto;
import com.example.backend.dto.UserDto;
import com.example.backend.model.Like;
import com.example.backend.model.User;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Like like, User reqUser){


        UserDto user=UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto= UserDtoMapper.toUserDto(reqUser);
        TwitDto twit= TwitDtoMapper.toTwitDto(like.getTwit(),reqUser);


        LikeDto likeDto=new LikeDto();
        likeDto.setId(like.getId());
        likeDto.setTwit(twit);
        likeDto.setUser(user);



        return likeDto;
    }


    public static List<LikeDto> toLikeDtos(List<Like> likes,User reqUser){
        List<LikeDto> likeDtos=new ArrayList<>();

        for(Like like:likes){
            UserDto user=UserDtoMapper.toUserDto(like.getUser());
            TwitDto twit= TwitDtoMapper.toTwitDto(like.getTwit(),reqUser);


            LikeDto likeDto=new LikeDto();
            likeDto.setId(like.getId());
            likeDto.setTwit(twit);
            likeDto.setUser(user);
            likeDtos.add(likeDto);
        }

        return likeDtos;
    }

}
