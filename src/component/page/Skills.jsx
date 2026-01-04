import React, { useState } from 'react';
import Heading from '../subComponent/Heading';
import FilterSkillBtn from '../subComponent/FilterSkillBtn';
import IconCloud from '../subComponent/IconCloud';
import SkillList from '../subComponent/SkillList';

const slugs = [
    "typescript",
    "javascript",
    "dart",
    "java",
    "react",
    "flutter",
    "android",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "firebase",
    "nginx",
    "vercel",
    "testinglibrary",
    "jest",
    "cypress",
    "docker",
    "git",
    "jira",
    "github",
    "gitlab",
    "visualstudiocode",
    "androidstudio",
    "sonarqube",
    "figma",
];

function Skills() {
    const [activeTab, setActiveTab] = useState("All"); // Default tab is "All"

    return (
        <div className='skill m-0 sm:m-2 md:m-[20px_20px_60px_20px] lg:m-[0px_0px_100px_0px] p-1 sm:p-2 md:p-[30px_10px_0px_10px] lg:p-[50px_30px_0px_30px] xl:p-[50px_50px_0px_50px]'>
            <div className='relative'>
                <div className="mb-3 md:mb-8">
                    <Heading title="Skills" />
                </div>
                <div className="hidden md:block absolute top-0 right-0 z-[-1] opacity-[0.4]">
                    <IconCloud iconSlugs={slugs} />
                </div>
            </div>
            <div className='skill_body mt-2 md:mt-4'>
                <div className="mb-4">
                    <FilterSkillBtn activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                <div>
                    <SkillList activeTab={activeTab} />
                </div>
            </div>
        </div>
    );
}

export default Skills;
