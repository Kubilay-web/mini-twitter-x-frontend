package com.example.backend.controller;


import com.example.backend.config.JwtProvider;
import com.example.backend.exception.UserException;
import com.example.backend.model.User;
import com.example.backend.model.Varification;
import com.example.backend.repository.UserRepository;
import com.example.backend.response.AuthResponse;
import com.example.backend.service.CustomUserDetailsServiceImplementation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomUserDetailsServiceImplementation customeUserDetails;


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {

        System.out.println("user"+user);
       String email=user.getEmail();
       String password=user.getPassword();
       String fullName=user.getFullName();
       String birthDate=user.getBirthDate();
       String mobile=user.getMobile();

       //User isEmailExist=userRepository.findByEmail(email);

       //if(isEmailExist!=null){
         //  throw new UserException("Email is already used with another account");
      // }

       User createdUser=new User();
       createdUser.setEmail(email);
       createdUser.setMobile(mobile);
       createdUser.setFullName(fullName);
       createdUser.setPassword(passwordEncoder.encode(password));
       createdUser.setBirthDate(birthDate);
       createdUser.setVerification(new Varification());

       User savedUser=userRepository.save(createdUser);
       Authentication authentication=new UsernamePasswordAuthenticationToken(email,password);
       SecurityContextHolder.getContext().setAuthentication(authentication);


       String token= jwtProvider.generateToken(authentication);
       AuthResponse res=new AuthResponse(token,true);


       return new ResponseEntity<AuthResponse>(res,HttpStatus.CREATED);
    }



    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody User loginUser) throws UserException {
        String email = loginUser.getEmail();
        String password = loginUser.getPassword();

        User existingUser = userRepository.findByEmail(email);

        if (existingUser == null || !passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new UserException("Invalid email or password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);
        AuthResponse res = new AuthResponse(token, true);

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
        }

        return new ResponseEntity<>("Logged out successfully", HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password) {

        UserDetails userDetails=customeUserDetails.loadUserByUsername(username);

        if(userDetails==null){
            throw new BadCredentialsException("Invalid username..");
        }

        if(passwordEncoder.matches(password,userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
