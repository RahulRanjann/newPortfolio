// src/utility/Color.js

// Define techColors array here 
const techColors = [
    { name: ["HTML", "HTML5"], color: "#FF5733" },      // Soft orange-red
    { name: ["CSS", "CSS3"], color: "#2965f1" },        // Medium blue
    { name: ["JavaScript", "JS"], color: "#f7df1e" },   // Yellow (JavaScript signature color)
    { name: ["React", "ReactJS", "React.Js"], color: "#61dafb" },   // React blue
    { name: ["Node", "NodeJS", "Node.Js"], color: "#3C873A" },      // Medium green
    { name: ["Express", "ExpressJS", "Express.Js"], color: "#888888" }, // Grey
    { name: ["MongoDB", "Mongoose"], color: "#4DB33D" },   // Slightly darker green
    { name: ["MySQL", "SQL"], color: "#00758F" },          // Teal blue
    { name: ["Python", "Python3"], color: "#306998" },     // Blueish-grey
    { name: ["Java", "Java8"], color: "#b07219" },         // Orange-brown
    { name: ["TypeScript", "TS"], color: "#007ACC" },      // Medium blue
    { name: ["Next.js"], color: "#000000" },               // Black (default for Next.js)
    { name: ["Tailwind", "Tailwind CSS"], color: "#38B2AC" }, // Teal
    { name: ["Firebase"], color: "#FFCA28" },              // Golden yellow
    { name: ["Docker"], color: "#0db7ed" },                // Blue
    { name: ["Git", "GitHub"], color: "#F1502F" },         // Red-orange
    { name: ["VSCode"], color: "#0078d7" },                // Medium blue
    { name: ["Google Cloud", "GCP"], color: "#4285F4" },   // Google blue
    { name: ["Postman"], color: "#FF6C37" },               // Light red-orange
    { name: ["OpenAI"], color: "#A259FF" },                // Purple
    { name: ["Docker"], color: "#2496ED" },                // Medium-light blue
    { name: ["LiveKit"], color: "#6C63FF" } 
];




export const getTechStackColor = (nameOfStack) => {
    // Convert the stack name to lowercase
    const lowerCaseStack = nameOfStack.toLowerCase();

    // Find the matching color object
    const matchedColor = techColors.find(color =>
        color.name.some(name => name.toLowerCase() === lowerCaseStack)
    );

    // Return the matched color, or a default color if no match is found
    return matchedColor ? matchedColor.color : '#000000'; // default to black if not found
};
