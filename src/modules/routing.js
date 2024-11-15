import header from '../../components/header/header.js';

class Routing {
    routes;

    init(routes) {
        this.routes = routes;
    }

    addNewRouteWithRender(route, render) {
        this.routes[route].render = render
    }

    goToPage(path, noPush = false){
        const [route, param] = this.getRouteAndParams(path);

        let main;
        if(!document.querySelector('header')) {
            main = this.initHeaderAndMain();
        }
        main ??= document.querySelector('.main');
        if(main.childElementCount !== 1){
            main.lastChild.remove();
        }
        const exactRoute = this.routes[route];
        if(exactRoute){
            if(!noPush){
                history.pushState({page: exactRoute.name}, '', path);
            }
            if(param){
                exactRoute.render(main, param);
            } else {
                exactRoute.render(main);
            }
        }
    }

    initHeaderAndMain() {
        const root = document.querySelector('#root');
        const main = document.createElement('div');
        main.classList.add('main');
        root.appendChild(main);
        main.appendChild(header.render());

        return main;
    }

    getRouteAndParams(path) {
        let numberOfSlashes = 0;
        let route = path;
        let param = null;
        for(const char of path) {
            numberOfSlashes += Number(char === '/');
        }
        if(numberOfSlashes > 1) {
            route = path.slice(0, path.indexOf('/', 1));
            param = path.slice(path.lastIndexOf('/') + 1, path.length);
        }
        return [route, param];
    }
}

export default new Routing();