import React from 'react';

export default function Avatar({ collaborators }) {
    return (
        <div className="flex -space-x-1 ">
            {collaborators.map((colab, index) => (
                <a href={colab.colabaterLink} key={index} target="_blank" rel="noopener noreferrer">
                    <img
                        alt={`Avatar ${index + 1}`}
                        src={colab.img}
                        className="avatar_img inline-block h-[50px] w-[50px] rounded-full ring-2 ring-white "
                    />
                </a>
            ))}
        </div>
    );
}
