import React from "react";
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from "react-icons/fa";
import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/layout/Spinner";

import GithubContext from "../context/github/GithubContext";
import RepoList from "../components/repos/RepoList";
import { getUser, getUserRepos } from "../context/github/GithubActions";

function User() {
    const { user, loading, repos, dispatch } = useContext(GithubContext);
    const params = useParams();

    useEffect(() => {
        dispatch({ type: "SET_LOADING" });
        const getUserData = async () => {
            const userData = await getUser(params.login);
            dispatch({ type: "GET_USER", payload: userData });
            const userRepos = await getUserRepos(params.login);
            dispatch({ type: "GET_REPOS", payload: userRepos });
        };

        getUserData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, params.login]);

    const {
        name,
        type,
        avatar_url,
        location,
        bio,
        blog,
        twitter_username,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable,
        websiteUrl,
    } = user;

    if (loading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="w-full mx-auto lg:w-10/12">
                <div className="mb-4">
                    <Link to="/" className="btn btn-ghost">
                        Back To Search
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
                    <div className="custom-card-image mb-6 md:mb-0">
                        <div className="rounded-lg shadow-xl card image-full">
                            <figure>
                                <img src={avatar_url} alt="" />
                            </figure>
                            <div className="card-body justify-end">
                                <h2 className="card-title mb-0">{name}</h2>
                                <p className="flex-grow-0">{login}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-6">
                            <h1 className="text-3xl card-title">
                                {name}
                                <div className="ml-2 mr-1 badge badge-success">
                                    {type}
                                </div>
                                {hireable && (
                                    <div className="mx-1 badge badge-info">
                                        Hireable
                                    </div>
                                )}
                            </h1>
                            <p>{bio}</p>
                            <div className="mt-4 card-actions">
                                <a
                                    href={html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-outline"
                                >
                                    Visit Github Profile
                                </a>
                            </div>
                        </div>

                        <div className="w-full rounded-lg shadow-md bg-base-100 stats">
                            {location && (
                                <div className="stat">
                                    <div className="stat-title text-md">
                                        Location
                                    </div>
                                    <div className="text-lg stat-value">
                                        {location}
                                    </div>
                                </div>
                            )}
                            {blog && (
                                <div className="stat">
                                    <div className="stat-title text-md">
                                        Website
                                    </div>
                                    <div className="text-lg stat-value">
                                        <a
                                            href={websiteUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {websiteUrl}
                                        </a>
                                    </div>
                                </div>
                            )}
                            {twitter_username && (
                                <div className="stat">
                                    <div className="stat-title text-md">
                                        Twitter
                                    </div>
                                    <div className="text-lg stat-value">
                                        <a
                                            href={`https://twitter.com/${twitter_username}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {twitter_username}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <dl className="my-8 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col bg-white/5 p-8">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-3xl md:text-5xl" />
                        </div>
                        <dd className="order-first text-2xl font-semibold tracking-tight text-white p-3">
                            {followers} Followers
                        </dd>
                    </div>

                    <div className="flex flex-col bg-white/5 p-8">
                        <div className="stat-figure text-secondary">
                            <FaUserFriends className="text-3xl md:text-5xl" />
                        </div>
                        <dd className="order-first text-2xl font-semibold tracking-tight text-white p-3">
                            {following} Following
                        </dd>
                    </div>

                    <div className="flex flex-col bg-white/5 p-8">
                        <div className="stat-figure text-secondary">
                            <FaCodepen className="text-3xl md:text-5xl" />
                        </div>
                        <dd className="order-first text-2xl font-semibold tracking-tight text-white p-3">
                            {public_repos} Public Repos
                        </dd>
                    </div>

                    <div className="flex flex-col bg-white/5 p-8">
                        <div className="stat-figure text-secondary">
                            <FaStore className="text-3xl md:text-5xl" />
                        </div>
                        <dd className="order-first text-2xl font-semibold tracking-tight text-white p-3">
                            {public_gists} Public Gists
                        </dd>
                    </div>
                </dl>
                <RepoList repos={repos} />
            </div>
        </>
    );
}

export default User;
