import React from 'react';
import {
    AntDesign, Bash, Css, Canva, CLang, Django, Figma, Firebase, Github, HTML, Java, JS, JetBrain, Json, Jupyter,
    Linux, MUI, MongoDB, MySql, NPM, NumPy, Pandas, Postman, Powershell, Python, PyCham, ReactBootstrap,
    ReactLogo, Tailwind, Ubuntu, VsCode, XML
} from "../../assets";

const SkillList = ({ activeTab }) => {

    const AllLang = [
        { name: "AntDesign", icon: AntDesign, category: "miscellaneous" },
        { name: "Bash", icon: Bash, category: "languages" },
        { name: "Css", icon: Css, category: "languages" },
        { name: "Canva", icon: Canva, category: "tools" },
        { name: "C", icon: CLang, category: "languages" },
        { name: "Django", icon: Django, category: "frameworks" },
        { name: "Figma", icon: Figma, category: "tools" },
        { name: "Firebase", icon: Firebase, category: "databases" },
        { name: "Github", icon: Github, category: "tools" },
        { name: "HTML", icon: HTML, category: "languages" },
        { name: "Java", icon: Java, category: "languages" },
        { name: "JS", icon: JS, category: "languages" },
        { name: "JetBrain", icon: JetBrain, category: "tools" },
        { name: "Json", icon: Json, category: "miscellaneous" },
        { name: "Jupyter", icon: Jupyter, category: "tools" },
        { name: "Linux", icon: Linux, category: "miscellaneous" },
        { name: "MUI", icon: MUI, category: "frameworks" },
        { name: "MongoDB", icon: MongoDB, category: "databases" },
        { name: "MySql", icon: MySql, category: "databases" },
        { name: "NPM", icon: NPM, category: "tools" },
        { name: "NumPy", icon: NumPy, category: "miscellaneous" },
        { name: "Pandas", icon: Pandas, category: "miscellaneous" },
        { name: "Postman", icon: Postman, category: "tools" },
        { name: "Powershell", icon: Powershell, category: "tools" },
        { name: "Python", icon: Python, category: "languages" },
        { name: "PyCham", icon: PyCham, category: "tools" },
        { name: "ReactBootstrap", icon: ReactBootstrap, category: "frameworks" },
        { name: "ReactLogo", icon: ReactLogo, category: "frameworks" },
        { name: "Tailwind", icon: Tailwind, category: "frameworks" },
        { name: "Ubuntu", icon: Ubuntu, category: "miscellaneous" },
        { name: "VsCode", icon: VsCode, category: "tools" },
        { name: "XML", icon: XML, category: "miscellaneous" },
    ];

    // Filter the skills based on the active tab
    const filteredSkills = AllLang.filter(skill => activeTab === "All" || skill.category === activeTab.toLowerCase());

    return (
        <div className="px-0 py-2">
            <div className="grid grid-cols-4 gap-4 md:gap-4 lg:gap-6 mb-20">
                {filteredSkills.map(({ icon, name }, index) => (
                    <div className="flex justify-center items-center mb-6" key={index}>
                        <div className="icon_holder flex flex-col items-center justify-center text-white font-medium shadow-[0_8px_15px_rgba(215,215,215,0.26)] backdrop-blur-[20px] rounded-[10px] border border-[rgba(255,255,255,0.18)] relative transition-transform duration-300 ease-in-out bg-[rgba(250,250,250,0.26)] w-[150px] h-[150px]">
                            <img
                                className="skill_icon w-[80px] h-[80px]"
                                src={icon}
                                alt={name}
                            />
                            <p className="skill_name m-0 p-0 font-quicksand text-center text-[12px] mt-1 opacity-0 visibility-hidden transition-opacity duration-500 ease-in-out">{name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillList;
