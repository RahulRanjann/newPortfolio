import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import WorkIcon from '@mui/icons-material/Work'; 
import SchoolIcon from '@mui/icons-material/School'; 

const Timeline = ({ timelineData }) => {
    return (
        <div className="timeline_container">
            <VerticalTimeline>
                {timelineData.map((item, index) => (
                    <VerticalTimelineElement
                        key={index}
                        className={`vertical-timeline-element--${item.type === 'work' ? 'work' : 'education'}`}
                        contentStyle={{
                            background: 'rgb(76 80 83)',
                            color: '#fff',
                        }}
                        contentArrowStyle={{
                            borderRight: item.type === 'work' 
                                ? '7px solid rgb(76 80 83)' 
                                : '7px solid rgb(76 80 83)',
                        }}
                        date={item.date}
                        iconStyle={{
                            background: item.type === 'work' ? 'rgb(76 80 83)' : 'rgb(76 80 83)',
                            color: '#fff',
                        }}
                        icon={item.type === 'work' ? <WorkIcon /> : <SchoolIcon />}
                    >
                        <h3 className="vertical-timeline-element-title"> {item.type === 'work' ? `${item.title} at ${item.CompanyName}` : item.title} </h3>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h4 className="vertical-timeline-element-subtitle">{item.Location}</h4>
                            </div>
                            <div className='timeLineLogo'>
                                <a href={item.link}><img src={item.logo} alt="" /></a>
                            </div>
                        </div>
                        <p>{item.description}</p>
                    </VerticalTimelineElement>
                    
                ))}
                
            </VerticalTimeline>
            
        </div>
    );
};

export default Timeline;
