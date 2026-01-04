import React from 'react';
import Heading from '../subComponent/Heading';
import FlipCard from '../subComponent/FlipCard';
import { Om, Rahul } from "../../assets/contri"; // Importing images correctly

function Projects() {
    const projects = [
        {
            // img: githubImg,
            img: require('../../assets/githubApi.png'),
            title: "GitHub Profile Finder",
            desc: "A web app using GitHub API to fetch user profiles and display details like bio, repos, and followers. Features dynamic data fetching and a clean UI for enhanced user experience.",
            techStack: "HTML, CSS, JavaScript, Tailwind, React, GitHub API",
            websiteLink: "https://rahulranjann.github.io/ReactJs-main/",
            githubLink: "https://github.com/RahulRanjann/ReactJs-main/blob/main/about-react-hooks/src/Component/GitHubApi.jsx",
            colabaterName: [
                {
                    name: "Rahul Ranjan",
                    img: Rahul, 
                    colabaterLink: "https://github.com/rahulranjann"
                },
            ]
        },
        {
            img: require('../../assets/goMilestone.png'),
            title: "Go Milestone",
            desc: "Official GoMilestone website with integrated Google Maps and country code feature for contact forms. Hosted on GitHub Pages for easy access and deployment.",
            techStack: "HTML, CSS, JavaScript, MDB5, Google Map, GitHub",
            websiteLink: "https://rahulranjann.github.io/JavaScriptProject/GoMile%20Stone/index.html",
            githubLink: "https://github.com/RahulRanjann/JavaScriptProject/tree/master/GoMile%20Stone",
            colabaterName: [
                {
                    name: "Rahul Ranjan",
                    img: Rahul,
                    colabaterLink: "https://github.com/rahulranjann"
                }
            ]
        },
        {
            img: require('../../assets/tour&traver.png'),
            title: "TourTravel",
            desc: "Travel booking site with user authentication and ticket booking via Firebase. Includes real-time chat support through Tawk.to for interactive assistance.", 
            techStack: "Firebase, JavaScript, gitHub, HTML, CSS",
            websiteLink: "https://rahulranjann.github.io/JavaScriptProject/tour%20and%20travel%20website/web.html#book",
            githubLink: "https://github.com/RahulRanjann/JavaScriptProject/tree/master/tour%20and%20travel%20website",
            colabaterName: [
                {
                    name: "Rahul Ranjan",
                    img: Rahul,
                    colabaterLink: "https://github.com/rahulranjann"
                },
                {
                    name: "Om Prakash",
                    img: Om,
                    colabaterLink: "https://github.com/samnickgammer"
                }
            ]
        }

        // Add more projects as necessary
    ];

    return (
        <div className='skill mt-0 mx-4 mb-[12px] pt-[35px] px-4 md:px-8 lg:px-20 xl:px-[200px] pb-[50px]'>
            <div>
                <Heading title="Projects" />
            </div>
            <div className="">
                <FlipCard projects={projects} />
            </div>
        </div>
    );
}

export default Projects;
