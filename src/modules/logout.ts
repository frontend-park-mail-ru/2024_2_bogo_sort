import { informationStorage } from './informationStorage.ts';
import { pipe } from './pipe.ts';
import ajax from './ajax.ts';

export function logout() {
    ajax.post('/logout', null);
    informationStorage.setUser(null);
    pipe.executeCallback('updateHeader');
}
