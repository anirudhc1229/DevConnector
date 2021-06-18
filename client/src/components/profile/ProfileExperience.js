import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({ 
    experience: {
        company, 
        title, 
        location, 
        from, 
        to, 
        current, 
        description
    } 
}) => {
    return (
        <div>
            <h3 className='text-dark'>
                <i className='fab fa-black-tie'></i>{' '}
                {company}
            </h3>
            <p>
                <Moment format='MM/DD/YYYY'>{from}</Moment> - 
                {to ? <Moment format='MM/DD/YYYY'>{to}</Moment> : " Current"}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default ProfileExperience;
