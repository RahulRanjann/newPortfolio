import React from 'react'

const Buttons = () => {
    const btnName = ["All", "FrameWork", "Tools", "DataBase", "Language", "Miscellaneous"]
  return (
    <div>

        {btnName.map((name) => (
            <div className='skill_btn'>
                <button>{name}</button>
            </div>
        ))}
    </div>
  )
}

export default Buttons
