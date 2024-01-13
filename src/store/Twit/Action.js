
import axios from "axios";
import { api } from "../../config/api";
import { API_BASE_URL } from "../../config/api";
import { find_tweet_by_id_failure,get_all_tweets_failure, find_tweet_by_id_success, get_all_tweets_request, get_users_tweet_failure, get_users_tweet_success, like_tweet_failure, like_tweet_success, reply_tweet_failure, reply_tweet_request, reply_tweet_success, retweet_failure, retweet_success, tweet_create_failure, tweet_create_success, tweet_delete_failure, tweet_delete_success, user_like_tweet_failure, user_like_tweet_success } from "./ActionType";


export const getAllTweets = () => async(dispatch) => {

    try{
        const {data} = await api.get("/tweets/all")
        console.log("get all",data)
        dispatch({type:get_all_tweets_request,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:get_all_tweets_failure,payload:error.message})
    }

}


export const getUserTweets = (userId) => async(dispatch) => {

    try{
        const {data} = await api.get(`/profile/tweets/user/${userId}`)
        console.log("get user twits :",data)
        dispatch({type:get_users_tweet_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:get_users_tweet_failure,payload:error.message})
    }

}



export const findTwitsByLikeContaineUser = (userId) => async(dispatch) => {

    try{
        const {data} = await api.get(`/profile/tweets/user/${userId}/likes`)
        console.log("get user twits :",data)
        dispatch({type:user_like_tweet_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:user_like_tweet_failure,payload:error.message})
    }

}



export const findTwitsById = (twitId) => async(dispatch) => {

    try{
        const {data} = await api.get(`/profile/tweets/${twitId}`)
        console.log("find twits by id :",data)
        dispatch({type:find_tweet_by_id_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:find_tweet_by_id_failure,payload:error.message})
    }

}



export const createTweet = (tweetData) => async(dispatch) => {

    try{
        const {data} = await api.post(`/tweets/create/tweet`,tweetData);
        console.log("created data:",data)
        dispatch({type:tweet_create_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:tweet_create_failure,payload:error.message})
    }

}


export const editTweet = (id, tweetData) => async (dispatch) => {
    try {
        const { data } = await api.put(`/tweets/edit/tweet/${id}`, tweetData);
        console.log("edited data:", data);
        dispatch({ type: "tweet_edit_success", payload: data });
    } catch (error) {
        console.log(error);
        dispatch({ type: "tweet_edit_failure", payload: error.message });
    }
};



export const createTweetReply = (tweetData) => async(dispatch) => {

    try{
        const {data} = await api.post(`/profile/tweets/tweet`,tweetData);
        console.log("reply tweet:",data)
        dispatch({type:reply_tweet_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:reply_tweet_failure,payload:error.message})
    }

}


export const createReTweet = (twitId) => async(dispatch) => {

    try{
        const {data} = await api.post(`/profile/tweets/retwit/${twitId}`);
        console.log("retweet:",data)
        dispatch({type:retweet_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:retweet_failure,payload:error.message})
    }

}


export const likeTweet = (twitId) => async(dispatch) => {

    try{
        const {data} = await api.post(`/profile/${twitId}/likes`);
        console.log("like tweets:",data)
        dispatch({type:like_tweet_success,payload:data})
    } catch (error) {
        console.log(error)
        dispatch({type:like_tweet_failure,payload:error.message})
    }

}


export const deleteTweet = (twitId) => async(dispatch) => {

    try{
        const {data} = await api.post(`/tweets/${twitId}`);
        console.log("delete tweet:",data)
        dispatch({type:tweet_delete_success,payload:twitId})
    } catch (error) {
        console.log(error)
        dispatch({type:tweet_delete_failure,payload:error.message})
    }

}