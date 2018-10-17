import React, {Component} from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './PageLink.module.scss';

class PageLink extends Component
{
    render()
    {
        const {text, href, icon} = this.props;
        return (
            <div className={style.PageLink}>
                <div className={style.icon}><FontAwesomeIcon icon={icon}/></div>
                <Link onlyActiveOnIndex={false} to={href} key={href}>{text}</Link>
            </div>
        );
    }
}

PageLink.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired
};

export default PageLink;
