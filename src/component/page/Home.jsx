import React from "react";
import Type from "../Navbar/Type"; // Import the Type component
import DecoderText from "./DecoderText";
import {
    Avatar
} from "../../assets";
import SocialMedia from "../subComponent/SocialMedia";

function Home() {
    const data = [" MITian.", " Programmer.", " Student.", " Developer."];
    return (
        <div className="flex flex-col items-center justify-center mx-4 my-10 md:m-[50px_50px_10px_50px] lg:m-[50px_100px_10px_100px]">
            <div className="avatar flex items-center justify-center">
                <img className="rounded-full w-40 h-40 md:w-52 md:h-52 lg:w-60 lg:h-60 object-contain" src={Avatar} alt="" />
            </div>
            <div className="name_box mb-4 text-4xl md:text-5xl lg:text-6xl font-sans overflow-hidden whitespace-nowrap" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Hi, 👋 I'm <span className="my_name text-white font-bold text-3xl md:text-4xl lg:text-5xl font-sans" style={{ fontFamily: "'Quicksand', sans-serif" }}>Rahul.</span>
            </div>

            <div className="typeWriter">
                {/* <Type /> Use the Type component */}
                <DecoderText dataArray={data} />
            </div>
            <div className="description text-center mt-5 px-4 md:px-5 lg:px-7 text-white text-base md:text-lg lg:text-xl font-medium">
                <p>
                    Born in 2000 in India. I believe coding and technology can bring about
                    positive change and innovation. With a mission to create impactful
                    solutions, I am constantly exploring new ideas and developing projects
                    to contribute to the future of tech
                </p>
            </div>
            <SocialMedia />
        </div>
    );
}

export default Home;
