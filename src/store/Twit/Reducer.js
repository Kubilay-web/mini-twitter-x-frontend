import { find_tweet_by_id_request, tweet_create_request,tweet_delete_request,user_like_tweet_request,like_tweet_request, find_tweet_by_id_success, get_all_tweets_success, get_users_tweet_success, retweet_request, retweet_success, tweet_create_success, tweet_delete_success, user_like_tweet_success,tweet_create_failure,tweet_delete_failure,user_like_tweet_failure,like_tweet_failure,retweet_failure,find_tweet_by_id_failure,like_tweet_success,reply_tweet_success } from "./ActionType";

const initialState = {
    loading: false,
    data: null,
    error: null,
    twits: [],
    twit: null
}

export const twitReducer = (state = initialState, action) => {

    switch (action.type) {
        case tweet_create_request:
        case tweet_delete_request:
        case user_like_tweet_request:
        case like_tweet_request:
        case retweet_request:
        case find_tweet_by_id_request:
            return { ...state, loading: true, error: null }

        case tweet_create_failure:
        case tweet_delete_failure:
        case user_like_tweet_failure:
        case like_tweet_failure:
        case retweet_failure:
        case find_tweet_by_id_failure:
            return { ...state, loading: false, error: action.payload }

        case tweet_create_success:
            return {
                ...state,
                loading: false,
                error: null,
                twits: [action.payload, ...state.twits]
            }

        case get_all_tweets_success:
        case get_users_tweet_success:
            return {
                ...state,
                loading: false,
                error: null,
                twits: action.payload,

            };
        case user_like_tweet_success:
            return {
                ...state,
                loading: false,
                error: null,
                likedTwits: action.payload,

            };

        case like_tweet_success:
            return {
                ...state,
                loading: false,
                error: null,
                like: action.payload,

            };

        case tweet_delete_success:
            return {
                ...state,
                loading: false,
                error: null,
                twits: state.twits.filter((twit) => twit.id !== action.payload),

            };

        case retweet_success:
            return {
                ...state,
                loading: false,
                error: null,
                retwit: action.payload,

            };

        case find_tweet_by_id_success:
        case reply_tweet_success:
            return {
                ...state,
                loading: false,
                error: null,
                retwit: action.payload,

            };



        default:
            return state;
    }

}