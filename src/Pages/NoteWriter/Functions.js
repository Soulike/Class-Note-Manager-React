import {View as Modal} from '../../Components/Modal';
import {browserHistory} from 'react-router';

export function showLeaveModal(nextLocation)
{
    Modal.show('离开确认', '确认离开编辑器？你的编辑可能没有保存！', () =>
    {
        console.log(nextLocation);
        browserHistory.push(nextLocation);
    });
    return false;
}