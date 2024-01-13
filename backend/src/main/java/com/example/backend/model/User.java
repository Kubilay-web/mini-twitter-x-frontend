package com.example.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "fullName")
    private String fullName;
    @Column(name = "location")
    private String location;
    @Column(name = "website")
    private String website;
    @Column(name = "birthDate")
    private String birthDate;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    @Column(name = "mobile")
    private String mobile;
    @Column(name = "image")
    private String image;
    @Column(name = "backgroundImage")
    private String backgroundImage;
    @Column(name = "bio")
    private String bio;
    @Column(name = "reqUser")
    private boolean req_user;
    @Column(name = "loginWithGoogle")
    private boolean login_with_google;


    @JsonIgnore
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Twit> twit=new ArrayList<>();


    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<Like> likes=new ArrayList<>();

    @Embedded
    private Varification verification;

    @ManyToMany
    private List<User> followers =new ArrayList<>();

    @ManyToMany
    private List<User> followings=new ArrayList<>();



}
