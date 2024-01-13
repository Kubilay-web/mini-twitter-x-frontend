import React, { useState, useEffect } from "react";
import "./HomePage.css";
import twitterlogo from "./images/twitter-logo.png";
import home from "./images/home.png";
import explore from "./images/explore.png";
import notification from "./images/notification.png";
import messages from "./images/messages.png";
import bookmarks from "./images/bookmarks.png";
import lists from "./images/lists.png";
import profileoutline from "./images/profileoutline.png";
import dots from "./images/dots.png";
import vector from "./images/dots.png";
import customize from "./images/customize.png";
import image from "./images/image.png";
import gif from "./images/gif.png";
import stats from "./images/stats.png";
import smile from "./images/smile.png";
import schedule from "./images/schedule.png";
import search from "./images/search.png";
import settings from './images/settings.png';
import vector02 from "./images/vector-02.png";
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../store/Auth/Action";
import { createTweet, editTweet } from "../../store/Twit/Action";
import { useHistory } from 'react-router-dom';
import comments from "./images/comments.png";
import retweet from "./images/retweet.png";
import like from "./images/like.png";
import share from "./images/share.png";
import statistics from "./images/statistics.png";
import vector03 from "./images/vector-03.png";




function HomePage() {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();



    const handlelogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
        history.push('/');

    }


    const [tweets, setTweets] = useState([]);
    const [tweetText, setTweetText] = useState('');
    const [userData, setUserData] = useState({});



    const handleTweetSubmit = async (e) => {
        e.preventDefault();

        if (tweetText.trim() !== '') {
            const tweetData = {
                content: tweetText,
            };

            dispatch(createTweet(tweetData));
            setTweets([...tweets, tweetText]);
            setTweetText('');
        }
    };


    const handleEditTweet = async (e) => {
        e.preventDefault();

        if (tweetText.trim() !== '') {
            const tweetData = {
                content: tweetText,
            };

            dispatch(editTweet(tweetData));
            setTweets([...tweets, tweetText]);
            setTweetText('');
        }
    };



    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);


    return (
        <div className="homepage-main-container">
            <div className="homepage-container">
                <div className="first-part-container">
                    <img src={twitterlogo} alt="twitterlogo" style={{ width: 40, height: 33 }} />
                    <div className="homepage-home-section">
                        <img src={home} alt="home" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Hello</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={explore} alt="explore" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Explore</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={notification} alt="notification" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Notifications</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={messages} alt="home" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Messages</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={bookmarks} alt="bookmarks" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Bookmarks</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={lists} alt="lists" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Lists</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={profileoutline} alt="profileoutline" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">Profile</p>
                    </div>
                    <div className="homepage-home-section">
                        <img src={dots} alt="dots" style={{ width: 28, height: 28 }} />
                        <p className="home-section-paragraph">More</p>
                    </div>
                    <div className="homepage-first-part-tweet-container">
                        <p>Tweet</p>
                    </div>
                    <div className="homepage-first-avatar-container">
                        <img src="https://i.ibb.co/3sQrxns/1575899484936.jpg" alt="img" border="0" />
                        <div className="homepage-first-avatar-text-container">
                            <p className="homepage-first-avatar-text">{userData.name}</p>
                            <p className="homepage-first-avatar-subtext">@{userData.username}</p>
                        </div>
                        <img className="logout-image" onClick={() => setDropdownOpen(!isDropdownOpen)} src={vector} alt="vector" border="0" style={{ width: 28, height: 28 }} />

                        {isDropdownOpen && (
                            <div className="dropdown-content">
                                <a className="logout-link" onClick={handlelogout}>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="second-part-container">
                    <div className="second-part-home-container">
                        <p>Home</p>
                        <img src={customize} alt="customize" style={{ width: 24, height: 24 }} />
                    </div>
                    <div className="second-part-form-container">
                        <div className="homepage-second-avatar-container">
                            <form className="second-part-form" onSubmit={handleTweetSubmit}>
                                <div className="second-part-write">
                                    <img src="https://i.ibb.co/3sQrxns/1575899484936.jpg" alt="img" border="0" />
                                    <textarea type="text" className="second-part-text-area" name="content" placeholder="What's happening" value={tweetText} onChange={(e) => setTweetText(e.target.value)} />
                                </div>
                                <div className="second-part-tweet">
                                    <div className="second-part-tweet-images">
                                        <img src={image} alt="image" style={{ width: 24, height: 24 }} />
                                        <img src={gif} alt="gif" style={{ width: 24, height: 24 }} />
                                        <img src={stats} alt="stats" style={{ width: 24, height: 24 }} />
                                        <img src={smile} alt="smile" style={{ width: 24, height: 24 }} />
                                        <img src={schedule} alt="schedule" style={{ width: 24, height: 24 }} />
                                    </div>
                                    <div>
                                        <button className="second-part-tweet-button" type="submit">Tweet</button>
                                    </div>
                                </div>
                            </form>
                            <div className="tweet-feed">
                                {tweets.map((tweet, index) => (
                                    <div key={index} className="tweet-card">
                                        <div className="box">
                                            <div className="content">
                                                <div className="infos">
                                                    <img
                                                        className="avatar"
                                                        src="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png"
                                                        alt="Avatar"
                                                    />
                                                    <div className="tweet-container-general">
                                                        <div className="tweet-names">
                                                            <div className="dynamic-areas-flex">
                                                                <div className="dynamic-areas-tweet-names">
                                                                    <h3>React</h3>
                                                                    <p>@reactjs</p>
                                                                </div>
                                                                <div>
                                                                    <img src={vector03} alt="vector03" style={{ width: 17, height: 4 }} />
                                                                </div>
                                                            </div>
                                                            <div className="tweets-area">
                                                                {tweet}
                                                            </div>
                                                        </div>

                                                        <div className="active-section">
                                                            <div>
                                                                <img src={comments} alt="comments" style={{ width: 24, height: 24 }} />
                                                            </div>
                                                            <div>
                                                                <img src={retweet} alt="retweet" style={{ width: 24, height: 24 }} />
                                                            </div>
                                                            <div>
                                                                <img src={like} alt="like" style={{ width: 24, height: 24 }} />
                                                            </div>
                                                            <div>
                                                                <img src={share} alt="share" style={{ width: 24, height: 24 }} />
                                                            </div>
                                                            <div>
                                                                <img src={statistics} alt="statistics" style={{ width: 24, height: 24 }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
                <div className="third-part-container">
                    <div className="search-twitter-container">
                        <form className="search-twitter-form" action="/action_page.php">
                            <img src={search} alt="search" style={{ width: 24, height: 24 }} />
                            <input className="third-part-form-text" type="text" placeholder="Search Twitter" name="search" />
                        </form>
                    </div>
                    <div className="trends-twitter-container">
                        <div className="trends-for-you">
                            <h1>Trends for you</h1>
                            <img src={settings} alt="settings" style={{ width: 24, height: 24 }} />
                        </div>
                        <div className="trends-topics-container">
                            <div className="trend-topic">
                                <p className="trend-country">Trending in Germany</p>
                                <p className="trend-topic-paragraph">Revolution</p>
                                <p>50.4K Tweets</p>
                            </div>
                            <div className="three-dots">
                                <img src={vector02} alt="settings" style={{ width: 17, height: 4 }} />
                            </div>
                        </div>
                        <div className="trends-topics-container">
                            <div className="trend-topic">
                                <p className="trend-country">Trending in Germany</p>
                                <p className="trend-topic-paragraph">Revolution</p>
                                <p>50.4K Tweets</p>
                            </div>
                            <div className="three-dots">
                                <img src={vector02} alt="settings" style={{ width: 17, height: 4 }} />
                            </div>
                        </div>
                        <div className="trends-topics-container">
                            <div className="trend-topic">
                                <p className="trend-country">Trending in Germany</p>
                                <p className="trend-topic-paragraph">Revolution</p>
                                <p>50.4K Tweets</p>
                            </div>
                            <div className="three-dots">
                                <img src={vector02} alt="settings" style={{ width: 17, height: 4 }} />
                            </div>
                        </div>
                    </div>
                    <div className="you-might-like-container">
                        <div className="account-container">
                            <img className="account-image" src="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png" alt="settings" style={{ width: 60, height: 60 }} />
                            <div>
                                <p className="name-account">Mushtariy</p>
                                <p className="name-detail">@Mushtar565266</p>
                            </div>
                            <div className="follow-container">
                                <button className="button-follow"><p>Follow</p></button>
                            </div>
                        </div>
                        <div className="account-container">
                            <img className="account-image" src="https://pbs.twimg.com/profile_images/446356636710363136/OYIaJ1KK_400x400.png" alt="settings" style={{ width: 60, height: 60 }} />
                            <div>
                                <p className="name-account">Mushtariy</p>
                                <p className="name-detail">@Mushtar565266</p>
                            </div>
                            <div className="follow-container">
                                <button className="button-follow"><p>Follow</p></button>
                            </div>
                        </div>
                        <div className="show-more-container">
                            <button className="button-show-more"><p>Show more</p></button>
                        </div>
                    </div>
                    <div className="terms-service-container">
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                        <p>Cookie Policy</p>
                    </div>
                    <div className="terms-service-more">
                        <p>Imprint</p>
                        <p>Ads Info</p>
                        <p>More ···</p>
                        <p>© 2021 Twitter, Inc.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;