import GithubUserSearch, { GithubUser } from "./GithubUserSearch";
import {act} from "react";
import ReactDOM from 'react-dom/client';

beforeEach(() => {
    
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('Test default state', async () => {
    const octocatUser:GithubUser = {
        login: "octocat",
        name: "The Octocat",
        bio: "Cool bio",
        twitter_username: "twitter_octocat",
        blog: "https://github.com",
        company: "@github"
    }

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true, 
        json: jest.fn().mockResolvedValue(octocatUser)
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    var root = ReactDOM.createRoot(container);

    await act(async () => {
        root.render(<GithubUserSearch />);
    });

    expect(container.getElementsByClassName("error").length).toBe(0);
    expect(container.getElementsByClassName("name")[0]?.textContent).toBe(octocatUser.name);
    expect(container.getElementsByClassName("username")[0]?.textContent).toBe("@" + octocatUser.login);
    expect(container.getElementsByClassName("bio")[0]?.textContent).toBe(octocatUser.bio);
    expect(container.getElementsByClassName("twitter")[0]?.textContent).toBe(octocatUser.twitter_username);
    expect(container.getElementsByClassName("blog")[0]?.textContent).toBe(octocatUser.blog);
    expect(container.getElementsByClassName("company")[0]?.textContent).toBe(octocatUser.company);
    expect(container.getElementsByClassName("light-mode")[0]?.textContent).toBe("Light");
});

test('Test empty user', async () => {
    const octocatUser:GithubUser = {
        login: "octocat",
        name: "",
        bio: "",
        twitter_username: "",
        blog: "",
        company: ""
    }

    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true, 
        json: jest.fn().mockResolvedValue(octocatUser)
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    var root = ReactDOM.createRoot(container);

    await act(async () => {
        root.render(<GithubUserSearch />);
    });

    expect(container.getElementsByClassName("error").length).toBe(0);
    expect(container.getElementsByClassName("name")[0]?.textContent).toBe(octocatUser.login);
    expect(container.getElementsByClassName("bio")[0]?.textContent).toBe("This profile has no bio");
    expect(container.getElementsByClassName("twitter")[0]?.textContent).toBe("Not Available");
    expect(container.getElementsByClassName("blog")[0]?.textContent).toBe("Not Available");
    expect(container.getElementsByClassName("company")[0]?.textContent).toBe("Not Available");
});

test('Test error state', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: false
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    var root = ReactDOM.createRoot(container);

    await act(async () => {
        root.render(<GithubUserSearch />);
    });

    expect(container.getElementsByClassName("user").length).toBe(0);
    expect(container.getElementsByClassName("error").length).toBe(1);
    expect(container.getElementsByClassName("light-mode")[0]?.textContent).toBe("Light");
});

test('Test light mode click', async () => {
    // @ts-ignore
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true, 
        json: jest.fn().mockResolvedValue({name: "The Octocat"})
    });

    const container = document.createElement('div');
    document.body.appendChild(container);
    var root = ReactDOM.createRoot(container);

    await act(async () => {
        root.render(<GithubUserSearch />);
    });

    await act(async () => {
        container.getElementsByClassName("light-mode")[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.getElementsByClassName("light-mode")[0]?.textContent).toBe("Dark");
});
