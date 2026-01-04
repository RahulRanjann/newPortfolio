import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { Github, Globe, Flip } from "../../assets";
import Avatar from "./Avatar";
import { BsPhoneFlip } from "react-icons/bs";
import { IconContext } from "react-icons";
import Tech from "./Tech";

const FlipCard = ({ projects }) => {
  const [isFlipped, setIsFlipped] = useState(
    Array(projects.length).fill(false)
  );

  const handleClick = (index) => {
    const newFlipStates = [...isFlipped];
    newFlipStates[index] = !newFlipStates[index];
    setIsFlipped(newFlipStates);
  };

  return (
    <div>
      <div className="flip-card-container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6 mt-10 mb-24">
        {projects.map((project, index) => (
          <ReactCardFlip
            key={index}
            isFlipped={isFlipped[index]}
            flipDirection="horizontal"
          >
            {/* Front side of the card */}
            <div
              className="front-card bg-transparent rounded-[8px] w-full max-w-[600px] h-[300px] md:h-[350px] lg:h-[400px] text-center box-border mx-auto"
              style={{
                backgroundImage: `url(${project.img})`,
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
              }}
            >
              <div className="glass flex items-center justify-center relative w-full h-full">
                <div className="title_holder flex items-center justify-center w-full h-full overflow-hidden">
                  <h1 className="Project_Name scale-up-center mt-[20px] px-4 text-center w-full">
                    {project.title}
                  </h1>
                </div>
                <div className="desc_holder">
                  <button
                    className="desc font-quicksand font-medium text-[16px] md:text-[18px] lg:text-[20px] text-center w-[80%] mt-[20px] mb-[20px]"
                    onClick={() => handleClick(index)}
                  >
                    <BsPhoneFlip className="redo text-white border-0 rounded-full absolute right-[10px] bottom-[10px] w-[35px] h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px] cursor-pointer p-[5px] bg-[rgba(72,72,72,0.62)]" />
                  </button>
                </div>
              </div>
            </div>
            {/* Back side of the card */}
            <div
              className="back-card w-full max-w-[600px] h-[300px] md:h-[350px] lg:h-[400px] p-[2px] bg-[rgba(142,174,255,0.621)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-[20px] rounded-[10px] mx-auto"
              onClick={() => handleClick(index)}
            >
              <p className="text-center text-[14px] md:text-[16px] lg:text-[18px] font-quicksand font-medium p-[10px] mt-[5px]">
                {project.desc}
              </p>
              <div className="techStack flex items-center justify-center flex-wrap gap-[5px] md:gap-[8px] mt-[10px] mb-[10px] md:mt-[15px] md:mb-[15px] font-quicksand font-bold text-[14px] md:text-[16px] lg:text-[18px] text-center w-full px-2">
                {/* Render each technology */}
                {project.techStack &&
                  project.techStack.split(",").map((tech, idx) => (
                    <Tech tech={tech.trim()} key={idx} /> // Ensure tech is trimmed
                  ))}
              </div>
              <div className="grouped flex items-center justify-center flex-wrap gap-[10px] mt-[10px] mb-[10px] md:mt-[15px] md:mb-[15px] font-quicksand font-bold text-[14px] md:text-[16px] lg:text-[18px] text-center w-full">
                <div>
                  <a
                    href={project.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={Globe}
                      alt="Website Link"
                      className="hostedLink w-[35px] h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={Github}
                      alt="GitHub Link"
                      className="codeLink w-[35px] h-[35px] md:w-[40px] md:h-[40px] lg:w-[45px] lg:h-[45px]"
                    />
                  </a>
                </div>
                <div>
                  <Avatar collaborators={project.colabaterName} />
                </div>
              </div>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
  );
};

export default FlipCard;
