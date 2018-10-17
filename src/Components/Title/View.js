import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Title.module.scss';

class Title extends Component
{
    render()
    {
        const {text} = this.props;
        return (
            <div className={style.Title}>
                {text}
            </div>
        );
    }
}

Title.propTypes = {
    text: PropTypes.string.isRequired
};

export default Title;
