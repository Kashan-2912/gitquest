"use server"

export async function fetchGithubStats(githubProfileUrl:string) {
    const username = githubProfileUrl.split("/").pop();
    const response = await fetch(`https://api.github.com/search/commits?q=author:${username}`);
    const data = await response.json();
    console.log(data.total_count)
    return data;
}