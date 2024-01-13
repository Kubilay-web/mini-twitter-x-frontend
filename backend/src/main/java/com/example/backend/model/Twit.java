package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@Table(name="twit")
public class Twit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name="content")
    private String content;
    private String image;
    private String video;


    @OneToMany(mappedBy = "twit",cascade = CascadeType.ALL)
    private List<Like> likes=new ArrayList<>();

    @ManyToOne()
    private User user;

    @OneToMany
    private List<Twit> replyTwits=new ArrayList<>();

    @ManyToMany
    private List<User> reTwitUser =  new ArrayList<>();

    @ManyToOne
    private Twit ReplyFor;

    private boolean isReply;

    private boolean isTwit;

    private LocalDateTime createdAt;



}
