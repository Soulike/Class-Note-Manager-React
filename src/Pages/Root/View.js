import React, {Component} from 'react';
import 'normalize.css/normalize.css';
import TopBar from './Components/TopBar/View';
import style from './Root.module.scss';

class Root extends Component
{

    render()
    {
        return (
            <div className={style.Root}>
                <TopBar/>
                <div className={style.innerWrapper}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Root;
