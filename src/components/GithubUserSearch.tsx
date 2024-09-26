import React from "react"

export default function GithubUserSearch() {
    const [searchTerm, setSearchTerm] = React.useState("")
    const [currentUser, setCurrentUser] = React.useState({});

    return (
        <div>
            <div>Github User Search</div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            {searchTerm}
        </div>
    )
}