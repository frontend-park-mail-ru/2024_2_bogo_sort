import { Stats } from '../../components/stats/stats.js';
import { informationStorage } from '../../modules/informationStorage.js';
import { router } from '../../modules/router.js';

export class StatsPage {
    render(main) {
        if(!informationStorage.isAuth()){
            router.goToPage('/login');

            return;
        }
        this.#renderTemplate(main);
    }

    #renderTemplate(main) {
        const stats = new Stats();

        const wrapper = document.createElement('div');
        wrapper.className = 'stats';
        wrapper.innerHTML += stats.render();
        main.appendChild(wrapper);
        stats.addHistogram();
    }
}