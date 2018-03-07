import axios from "axios"
import React from 'react'
import FontAwesome from 'react-fontawesome'

import { FormatDateTime } from '../utils/utils'

const ghBaseUrl = "https://github.com/"
const ghApiBaseUrl = "https://api.github.com/repos/"

const defaultVendor = "yuikns"
const defaultRepoName = "argcv"
const defaultRepoBranch = "master"

export default class GithubChangeLog extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        let { vendorName, repoName, repoBranch } = props
        vendorName = vendorName || defaultVendor
        repoName = repoName || defaultRepoName
        repoBranch = repoBranch || defaultRepoBranch
        let vendorUrl = ghBaseUrl + vendorName
        let repoUrl = vendorUrl + "/" + repoName
        let repoUrlWithBranch = repoUrl + "/tree/" + repoBranch
        let ghRepoApi = ghApiBaseUrl + vendorName + "/" + repoName
        let ghRepoApiCommits = ghRepoApi + "/commits"
        this.state = {
            vendorName: vendorName,
            repoName: repoName,
            repoBranch: repoBranch,
            vendorUrl: vendorUrl,
            repoUrl: repoUrl,
            repoUrlWithBranch: repoUrlWithBranch,
            ghRepoApi: ghRepoApi,
            ghRepoApiCommits: ghRepoApiCommits,
            watchers: 0,
            stargazers: 0,
            forks: 0,
            description: 0,
            updated_at: "",
            commits: []
        }
    }

    componentWillMount() {
        axios.get(this.state.ghRepoApi)
            .then(res => {
                // console.log(res)
                let { data } = res
                this.setState({
                    watchers: data.subscribers_count,
                    stargazers: data.stargazers_count,
                    forks: data.forks,
                    description: data.description,
                    // updated_at: data.updated_at,
                    updated_at: data.pushed_at,
                })
            }).catch(e => {
                console.log(e)
            })

        axios.get(this.state.ghRepoApiCommits)
            .then(res => {
                // console.log(res)
                let commits = res.data.slice(0, 100)
                // commits = commits[0]
                commits = commits.map((c, i) => {
                    let nc = {
                        sha: c.sha.substr(0, 8),
                        author: {
                            name: c.author.login,
                            url: c.author.url
                        },
                        committer: {
                            name: c.committer.login,
                            url: c.committer.url
                        },
                        commit: {
                            author: c.author,
                            committer: c.committer,
                            message: c.commit.message
                        },
                        url: c.url,
                        html_url: c.html_url
                    }
                    return <li key={i}>
                        <a href={nc.html_url}>{nc.sha}</a> {nc.commit.message} --  by <a href={nc.author.url}>{nc.author.name}</a>
                    </li>
                })
                // console.log(commits)
                this.setState({
                    commits: commits
                })
            }).catch(e => {
                console.log(e)
            })
    }

    render() {
        return (<div>
            <div>
                <h2 style={{ "display": "inline-block", "marginLeft": "3%" }}>
                    <span><a href={this.state.vendorUrl}>{this.state.vendorName}</a> </span>/
                    <span> <a href={this.state.repoUrl}>{this.state.repoName}</a></span>
                </h2>
                <p style={{ "display": "inline-block", "float": "right", "marginRight": "5%" }}>
                    <a href={this.state.repoUrl + "/watchers"} ><FontAwesome name="eye" />&nbsp;Watchers {this.state.watchers}</a>&nbsp;
                <a href={this.state.repoUrl + "/stargazers"} ><FontAwesome name="star" />&nbsp;Stargazers {this.state.stargazers}</a>&nbsp;
                <a href={this.state.repoUrl + "/network/members"} ><FontAwesome name="code-fork" />&nbsp;Forks {this.state.forks}</a>
                </p>
            </div>
            <div className="clearfix" />
            <ul>
                {[...this.state.commits]}
            </ul>
            <p><span><strong>updated at :</strong> {FormatDateTime(this.state.updated_at)}</span></p>
        </div>)
    }

}

