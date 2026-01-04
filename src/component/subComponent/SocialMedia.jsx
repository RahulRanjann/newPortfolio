import React from 'react'
import { Link } from "react-router-dom";
import {
    GithubLogo,
    GMailLogo,
    InstagramLogo,
    LinkedinLogo,
} from "../../assets";

const SocialMedia = () => {
    const social = [
        {link: "https://github.com/rahulranjann",
         logo: GithubLogo,
        },

        {link: "https://www.linkedin.com/in/rahulranjann/",
         logo: LinkedinLogo,
        },

        {link: "https://www.instagram.com/rahulranjann/",
         logo: InstagramLogo,
        },

        {link: "mailto:don.rahulranjann@gmail.com",
         logo: GMailLogo,
        },

    ]   

  return (
    <div className="social_media">
                <div className="social_media_icon flex items-center justify-center mt-[35px]">

                    {social.map(({link, logo}) => (
                        <div className="media_link m-[0px_10px_0px_10px]">
                            <a href={link} target="_blank" className='no-underline'>
                                <img className=' border-0 border-solid border-[#d1d1d1] rounded-[20%] p-1 h-10 w-10' src={logo} alt="" />
                            </a>
                        </div>
                    ))}
                    <div className="resume_download_btn">
                        <button className="btn ml-4 bg-white rounded-full border-0 shadow-[0_0_1px_rgba(25,25,25,0.04),0_3px_4px_rgba(0,0,0,0.1)] text-white cursor-pointer inline-block font-sans text-base h-12 px-6 transition-all duration-200">
                            <Link className='no-underline text-[#272727] font-quicksand font-bold' to="/resume">Download Resume</Link>
                        </button>
                    </div>
                </div>
            </div>
  )
}

export default SocialMedia
