import { Octokit } from 'octokit'

export type GithubRepoData = {
	owner: string
	name: string
	stars: number
	htmlUrl: string
	lastUpdated: string
}

export interface GithubRepo {
	id: string
	data: GithubRepoData
}

export const getGithubRepoData = async (args: { owner: string; repo: string }): Promise<GithubRepoData> => {
	const octokit = new Octokit()
	const response = await octokit.rest.repos.get(args)
	const { updated_at, stargazers_count, name, owner, html_url } = response.data

	return { lastUpdated: updated_at, stars: stargazers_count, name, owner: owner.login, htmlUrl: html_url }
}
