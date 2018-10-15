import React, {Component} from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import style from './PageLink.module.scss';

class PageLink extends Component
{
    render()
    {
        const {text, href} = this.props;
        return (
            <div className={style.PageLink}>
                <Link onlyActiveOnIndex={false} to={href}>{text}</Link>
            </div>
        );
    }
}

PageLink.propTypes = {
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
};

export default PageLink;
