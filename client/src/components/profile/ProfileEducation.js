import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ 
    education: {
        school,
        degree,
        fieldofstudy,
        from, 
        to, 
        current, 
        description
    } 
}) => {
    return (
        <div>
            <h3 className='text-dark'>
                <i class='fas fa-graduation-cap'></i>{' '}
                {school}
            </h3>
            <p>
                <Moment format='MM/DD/YYYY'>{from}</Moment> - 
                {to ? <Moment format='MM/DD/YYYY'>{to}</Moment> : " Current"}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                <strong>Field of Study: </strong> {fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation;
