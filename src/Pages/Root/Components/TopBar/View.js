import React, {Component} from 'react';
import style from './TopBar.module.scss';
import PageLink from './Components/PageLink/View';

class TopBar extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            links: [
                {
                    text: '笔记列表',
                    href: '/NoteList'
                }
            ]
        };
    }

    render()
    {
        const {links} = this.state;
        return (
            <div className={style.TopBar}>
                <div className={style.linkWrapper}>
                    {
                        links.map(link =>
                        {
                            return <PageLink {...link}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default TopBar;

