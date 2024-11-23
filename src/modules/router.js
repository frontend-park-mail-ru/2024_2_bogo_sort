class Router {
    routes;
    main;
    ifrmae = false;

    init(routes, main) {
        this.routes = routes;
        this.main = main;
    }

    addNewRouteWithRender(route, render) {
        this.routes[route].render = render;
    }

    goToPage(path, noPush = false){
        const [route, param] = this.getRouteAndParams(path);

        if(this.main.childElementCount !== 1){
            if(document.querySelector('.csat__iframe-wrapper')) {
                this.iframe = true;
                // this.main.firstChild.nextElementSibling.remove();
                this.main.lastChild.remove();
            }
            // } else {
                this.main.lastChild.remove();
            // }
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
            // if(this.iframe) {
            //     const iframe = document.querySelector('.csat__iframe-wrapper');
            //     const nextNode = iframe.nextElementSibling;
            //     const temp = document.createElement('div');
            //     temp.appendChild(nextNode.cloneNode(true));
            //     nextNode.replaceWith(ifrmae);
            //     iframe.replaceWith(temp.firstChild);
            // }
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
