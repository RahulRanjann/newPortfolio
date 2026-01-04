import React, { useEffect, useState } from "react";
import "../../../src/DecodeText.css"; // Assuming you put the CSS code into this file

const DecodeText = ({ dataArray = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Ensure dataArray is not empty
    const currentText = dataArray.length > 0 ? dataArray[currentIndex] : "";

    // Function to shuffle states and trigger the decode animation
    const decodeText = () => {
        const textElements = document.getElementsByClassName("text-animation");
        let state = Array.from({ length: textElements.length }, (_, i) => i);
        let shuffled = shuffle(state);

        for (let i = 0; i < shuffled.length; i++) {
            const child = textElements[shuffled[i]];
            child.classList.remove("state-1", "state-2", "state-3");
            const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
            setTimeout(() => firstStages(child), state1Time);
        }
    };

    const firstStages = (child) => {
        if (child.classList.contains("state-2")) {
            child.classList.add("state-3");
        } else if (child.classList.contains("state-1")) {
            child.classList.add("state-2");
        } else {
            child.classList.add("state-1");
            setTimeout(() => secondStages(child), 100);
        }
    };

    const secondStages = (child) => {
        if (child.classList.contains("state-1")) {
            child.classList.add("state-2");
            setTimeout(() => thirdStages(child), 100);
        }
    };

    const thirdStages = (child) => {
        if (child.classList.contains("state-2")) {
            child.classList.add("state-3");
        }
    };

    // Shuffle function
    const shuffle = (array) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    };

    // Cycle through the array data
    useEffect(() => {
        if (dataArray.length === 0) return; // Exit early if dataArray is empty

        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === dataArray.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        // Trigger decode animation whenever index changes
        decodeText();

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [currentIndex, dataArray]);

    return (
        <div className="decode-text text-xl">
            <span className="static-character">I'm a</span> {/* Static 'A' */}
            {currentText.split("").map((char, index) => (
                <div key={index} className={`text-animation state-1`}>
                    {char}
                </div>
            ))}
            {dataArray.length === 0 && <div>No data available</div>}
        </div>
    );
};

export default DecodeText;
