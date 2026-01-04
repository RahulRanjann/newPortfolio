import React from 'react';
import { getTechStackColor } from '../../utility/Color';

const Tech = ({ tech }) => {
  return (
    tech && (
      <div 
        style={{ backgroundColor: getTechStackColor(tech) }} // Ensures proper background color
        className='tech' 
      >
        {tech}
      </div>
    )
  )
}

export default Tech;
