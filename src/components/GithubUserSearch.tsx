import React from "react"
import moment from "moment"

type GithubUser = {
    login:string,
    name:string,
    bio:string,
    public_repos:number,
    followers:number,
    following:number,
    location:string,
    twitter_username:string,
    blog:string,
    company:string,
    created_at:string,
    displayDate:string,
    avatar_url:string
}

export default function GithubUserSearch() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [currentUser, setCurrentUser] = React.useState<GithubUser>();

    const search = () => {
        if(searchTerm) {
            fetch("https://api.github.com/users/" + searchTerm, {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: "Bearer " + process.env.REACT_APP_GITHUB_TOKEN,
                    "X-GitHub-Api-Version": "2022-11-28"
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                json.displayDate = moment(json.created_at).format("D MMM YYYY");
                setCurrentUser(json)
            })
        }
    }

    React.useEffect(() => {
        fetch("https://api.github.com/users/octocat", {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: "Bearer " + process.env.REACT_APP_GITHUB_TOKEN,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            json.displayDate = moment(json.created_at).format("D MMM YYYY");
            setCurrentUser(json)
        })
    }, []);

    return (
        <div>
            <div>Github User Search</div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <button type="button" onClick={search}>Search</button>
            <div className="user">
                <img src={currentUser?.avatar_url}></img>
                {currentUser?.name ? currentUser.name : currentUser?.login}
                @{currentUser?.login}
                {currentUser?.displayDate}
                {currentUser?.bio ? currentUser.bio : "This profile has no bio"}
                {currentUser?.public_repos}
                {currentUser?.followers}
                {currentUser?.following}
                {currentUser?.location ? currentUser.location : "Not Available"}
                {currentUser?.twitter_username ? currentUser.twitter_username : "Not Available"}
                {currentUser?.blog ? currentUser.blog : "Not Available"}
                {currentUser?.company ? currentUser.company : "Not Available"}

            </div>
        </div>
    )
}