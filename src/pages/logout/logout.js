import ajax from '../../modules/ajax.js';
import header from '../../components/header/header.js';

export class LogOutPage {
    render() {
        ajax.post('/logout');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('imageUrl');
        history.pushState(null, '', '/');
        header.changeHeader();
    }
};
