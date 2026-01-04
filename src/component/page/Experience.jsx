import React from 'react';
import Timeline from '../subComponent/Timeline';
import Heading from '../subComponent/Heading'
import LT from "../../assets/logo/LTLogo.png";
import GoMS from "../../assets/logo/GoMilestoneLogo.png";
import PL from "../../assets/logo/PineLimeLogo.png";
import Zinc from "../../assets/logo/zincLogo.png";
const experienceData = [
    {
        type: 'work',
        CompanyName: "Zinc",
        date: "Jan 2025 - Present",
        title: "QA Engineer",
        Location: "Bangalore, India",
        description: "I have automated the entire testing process in Zinc of ADA. I have also created a AI talk to ADA as parent.",
        logo: Zinc,
        link: "https://www.zinc.money"
    },

    {
        type: 'work',
        CompanyName: "Lets Transport",  // Replace with the company's name
        date: "Dec 2024 - Present",
        title: "Digital Ads Automation & Full Stack Developer",
        Location: "Bangalore, India",
        description: "Developed web applications and automated workflows for optimizing ad performance and cost per click. Built data scraping scripts to gather insights from various websites and automated the upload process to a designated platform. Collaborated on strategies to improve digital ad revenue using Google Ads API and other automation tools.",
        logo: LT, 
        link: "https://www.letstransport.com/"
    },
    {
        type: 'work',
        CompanyName: "Lets Transport",
        date: "May 2024 - Aug 2024",
        title: "Full Stack Developer",
        Location: "Bangalore, India",
        description: "Developed a website that increased website traffic by 40% and boosted company profit by 7%. Automated the process of scraping data from various websites and uploading it to a designated website.",
        logo: LT,
        link: "https://www.letstransport.com/"
    },
    {
        type: 'work',
        CompanyName: "Pine&Lime",
        date: "Mar 2024 - May 2024",
        title: "Full Stack Developer",
        Location: "Gurgaon, India",
        description: "A full-featured e-commerce application enabling users to register, authenticate, and manage their products.",
        logo: PL,
        link: "https://www.pinenlime.com/"
    },
    {
        type: 'work',
        CompanyName: "GoMilestone",
        date: "Dec 2023 - Jan 2024",
        title: "Full Stack Developer",
        Location: "Gurgaon, India",
        description: "Developed a responsive and scalable company website using HTML, CSS, JavaScript, and Bootstrap 5.",
        logo: GoMS,
        link: "https://gomilestone.com/"
    }
];

const Experience = () => {
    return (
        <div className='skill mx-4 md:mx-8 lg:mx-20 xl:mx-[200px] my-8 md:my-10 lg:my-12 p-4 md:p-8 lg:p-[35px_0_100px_0]'>
            <div className="w-full overflow-hidden">
                <Heading title="Experience" />
            </div>
            <Timeline timelineData={experienceData} />
        </div>
    );
};

export default Experience;
