class Router {
    routes;
    main;

    init(routes, main, routingEvent = null) {
        this.routes = routes;
        this.main = main;
        this.routingEvent = routingEvent;
    }

    addNewRouteWithRender(route, render) {
        this.routes[route].render = render;
    }

    goToPage(path, noPush = false){
        const [route, param] = this.getRouteAndParams(path);

        if(this.main.childElementCount !== 1){
            this.main.lastChild.remove();
        }
        const exactRoute = this.routes[route];
        if(exactRoute){
            if(!noPush){
                history.pushState({page: exactRoute.name}, '', path);
            }
            if(param){
                exactRoute.render(this.main, param);
            } else {
                exactRoute.render(this.main);
            }
        }

        if(this.routingEvent) {
            dispatchEvent(this.routingEvent);
        }
    }

    pushPageWithoutRedirect(path) {
        history.pushState(null, '', path);
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

export const router = new Router();
