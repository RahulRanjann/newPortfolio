import React from 'react';
import Timeline from '../subComponent/Timeline'; 
import Rit from "../../assets/logo/DSEULogo.png";
import Mit from "../../assets/logo/mitLogo.png";
import Heading from '../subComponent/Heading'

const educationData = [
    {
        type: 'education',
        title: "B.Tech. in Computer Science",
        date: "2022 - 2025",
        Location: "Manipal Institute of Technology, Manipal",
        description: "Graduated with a First Class degree. Specialized in Full Stack Development and Machine Learning.",
        logo: Mit

    },
    {
        type: 'education',
        title: "Diploma in ITEMS",
        date: "2019 - 2022",
        Location: "Rajokari Institute of Technology, Delhi",
        description: "Completed with an excellent academic record and an interest in mathematics and computer science.",
        logo: Rit
    }
];

const Education = () => {
    return (
        <div className='skill mx-4 md:mx-8 lg:mx-20 xl:mx-[200px] my-8 md:my-10 lg:my-12 p-4 md:p-8 lg:p-[35px_0_100px_0]'>
            <div className="w-full overflow-hidden">
                <Heading title="Education" />
            </div>
            <Timeline timelineData={educationData} />
        </div>
    );
};

export default Education;
