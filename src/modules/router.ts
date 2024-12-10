import { Routes } from '../constants/sharedTypes.ts'

class Router {
    routes: Routes | null = null;
    main: HTMLElement | null = null;
    routingEvent: CustomEvent | null = null;

    init(routes: Routes, main: HTMLElement, routingEvent: CustomEvent | null = null) {
        this.routes = routes;
        this.main = main;
        this.routingEvent = routingEvent;
    }

    addNewRouteWithRender(route: string, render: ((arg0: HTMLElement, arg1?: string) => void)) {
        if(this.routes?.[route]){
            this.routes[route].render = render;
        }
    }

    goToPage(path: string, noPush = false){
        const [route, param] = this.getRouteAndParams(path);

        if(this.main?.childElementCount !== 1){
            this.main?.lastChild?.remove();
        }
        const exactRoute = route ? this.routes?.[route] : null;
        if(exactRoute){
            if(!noPush){
                history.pushState({page: exactRoute.name}, '', path);
            }
            if(param && this.main){
                exactRoute.render(this.main, param);
            } else if(this.main) {
                exactRoute.render(this.main);
            }
        }
        if(this.routingEvent){
            dispatchEvent(this.routingEvent);
        }

    }

    pushPageWithoutRedirect(path: string) {
        history.pushState(null, '', path);
    }

    getRouteAndParams(path: string) {
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

export const router = new Router();
