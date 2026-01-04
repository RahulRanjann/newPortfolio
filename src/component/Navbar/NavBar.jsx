import React, { useEffect, useState } from "react";
import "../../../src/App.css";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
    const location = useLocation();
    const [activePath, setActivePath] = useState("/");

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    const navLinks = [
        { path: "/", title: "Home", icon: "home" },
        { path: "/about", title: "About", icon: "user" },
        { path: "/skills", title: "Skills", icon: "code-alt" },
        { path: "/projects", title: "Projects", icon: "spreadsheet" },
        { path: "/experience", title: "Experience", icon: "briefcase" },
        { path: "/education", title: "Education", icon: "buildings" },
        { path: "/resume", title: "Resume", icon: "file" },
    ]
    
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] md:w-[70%] lg:w-[50%] xl:w-[35%] bg-white/25 shadow-[0_4px_5px_0_rgba(246,246,246,0.37)] backdrop-blur-lg border border-white/20 rounded-xl flex items-center justify-center py-3">
      <div className="navBar w-full">
        <div className="container flex items-center justify-center w-full p-0 m-0.5 overflow-x-auto">
          <div className="page_link flex items-center justify-between md:justify-center space-x-1 md:space-x-2">
            {navLinks.map(({ path, title, icon }) => (
              <Link 
                key={path} 
                to={path} 
                title={title} 
                className={`no-underline min-w-[44px] min-h-[44px] flex items-center justify-center mx-1 md:mx-2 lg:mx-3 rounded-full transition-all ${activePath === path ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <box-icon color="white" name={icon} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

