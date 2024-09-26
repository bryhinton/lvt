import React from "react"
import moment from "moment"
import "./GithubUserSearch.scss"

export type GithubUser = {
    login:string,
    name?:string,
    bio?:string,
    public_repos?:number,
    followers?:number,
    following?:number,
    location?:string,
    twitter_username?:string,
    blog?:string,
    company?:string,
    created_at?:string,
    displayDate?:string,
    avatar_url?:string
}

export default function GithubUserSearch() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [currentUser, setCurrentUser] = React.useState<GithubUser | null>();
    const [lightMode, setLightMode] = React.useState(true);

    const search = () => {
        fetch("https://api.github.com/users/" + (searchTerm ? searchTerm : 'octocat'), {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: "Bearer " + process.env.REACT_APP_GITHUB_TOKEN,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        })
        .then((response) => {
            if(response.ok) {
                return response.json()
            } else {
                setCurrentUser(null)
                return null
            }
        })
        .then((json) => {
            if(json) {
                json.displayDate = moment(json.created_at).format("D MMM YYYY");
                setCurrentUser(json)
            }
        })
    }

    React.useEffect(() => {
        search();
    }, []);

    const checkForEnter = (e:any) => {
        if(e.key === "Enter") {
            search();
        }
    }

    return (
        <div className={"container" + (lightMode ? '' : ' dark')}>
            <div className="github-user-search" >
                <h1>Github User Search</h1>
                <div className="light-mode" onClick={() => setLightMode(!lightMode)}>
                    {lightMode ? 'Light' : 'Dark'}
                    <img src="brightness.png" alt="light-mode"/>
                </div>
                <div className="search-bar">
                    <img src="search-interface-symbol.png" className="search-icon" alt="search"></img>
                    <input type="text" placeholder="Search GitHub username..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => checkForEnter(e)}></input>
                    {!currentUser && <div className="error">No results</div>}
                    <button type="button" onClick={search}>Search</button>
                </div>
                {currentUser && <div className="user">
                    <div className="image-col">
                        <img src={currentUser.avatar_url} alt="avatar"></img>
                    </div>
                    <div className="profile-col">
                        <div className="name">
                            {currentUser.name ? currentUser.name : currentUser.login}
                        </div>
                        <div className="username">
                            @{currentUser.login}
                        </div>
                        <div className="date">
                            Joined {currentUser.displayDate}
                        </div>
                        <div className={`bio ${!currentUser.bio ? 'empty' : ''}`}>
                            {currentUser?.bio ? currentUser.bio : "This profile has no bio"}
                        </div>
                        <div className="counts">
                            <div className="count-col">
                                <div className="label">Repos</div>
                                <div className="value">{currentUser.public_repos}</div>
                            </div>
                            <div className="count-col">
                                <div className="label">Followers</div>
                                <div className="value">{currentUser.followers}</div>
                            </div>
                            <div className="count-col">
                                <div className="label">Following</div>
                                <div className="value">{currentUser.following}</div>
                            </div>
                        </div>
                        <div className="links">
                            <div className="link">
                                <img src="location-pin.png" className="link-icon" alt="location"></img>
                                {currentUser.location ? 
                                    <a className="value" target="_blank" rel="noreferrer" href={"https://www.google.com/maps/search/?api=1&query=" + currentUser.location}>{currentUser.location}</a> :
                                    <span className="value empty">Not Available</span>
                                }
                            </div>
                            <div className="link">
                                <img src="twitter.png" className="link-icon" alt="twitter"></img>
                                {currentUser.twitter_username ? 
                                    <a className="value twitter" target="_blank" rel="noreferrer" href={"https://twitter.com/" + currentUser.twitter_username}>{currentUser.twitter_username}</a> :
                                    <span className="value twitter empty">Not Available</span>
                                }
                            </div>
                            <div className="link">
                                <img src="link.png" className="link-icon" alt="website"></img>
                                {currentUser.blog ? 
                                    <a className="value blog" target="_blank" rel="noreferrer" href={currentUser.blog}>{currentUser.blog}</a> :
                                    <span className="value blog empty">Not Available</span>
                                }
                            </div>
                            <div className="link">
                                <img src="business-and-trade.png" className="link-icon" alt="company"></img>
                                {currentUser.company ? 
                                    <a className="value company" target="_blank" rel="noreferrer" href={"https://github.com/" + currentUser.company.substring(1)}>{currentUser.company}</a> :
                                    <span className="value company empty">Not Available</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}