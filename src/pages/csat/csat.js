import { Csat } from "../../components/csat/csat";
import ajax from "../../modules/ajax.js";

export class CsatPage {
    render(main, page) {
        return this.#renderTemplate(main, page);
    }

   async #renderTemplate(main, page) {
        document.querySelector('.main')?.remove();
        const root = document.querySelector('#root');

        const questions = await ajax.get(`/questions/${page}`)
        // this.questions = [
        //     { id: 1, question: 'Как вам Эмпориум?'},
        //     { id: 2, question: 'Как вам yt Эмпориум?'},
        // ];
       
        const csat = new Csat(this.questions);

        root.innerHTML += csat.render();
        this.#addListeners(root, csat);
    }

    #addListeners(root, csat) {
        const stars = root.querySelectorAll('.csat__star');

        stars.forEach((star, index) => {
            star.addEventListener('mouseenter', () => {
                this.clicked = false;
                for(let i = 0; i <= index; i++) {
                    stars[i].classList.add('active');
                }
            });
            star.addEventListener('mouseleave', () => {
                if(!this.clicked){
                    for(let i = 0; i < stars.length; i++) {
                        stars[i].classList.remove('active');
                    }
                }
            });
            star.addEventListener('click', () => {
                this.clicked = true;
                for(let i = 0; i <= index; i++) {
                    stars[i].classList.add('active');
                }
                for(let i = 0; i < stars.length; i++) {
                    stars[i].classList.remove('clicked');
                }
                star.classList.add('clicked');
            });
        });

        const nextButton = document.querySelector('.csat__next-button');
        nextButton?.addEventListener('click', () => {
            const questionId = document.querySelector('csat__question').dataset.id;
            let quantity = 0;
            stars.forEach((star, index) => {
                if(star.classList.contains('liked')){
                    quantity = index;
                }
            });

            //await ajax.post('/answer/${questionId}', {answer: quantity});

            root.innerHTML = csat.render();
            this.#addListeners(root, csat);
        });
    }
}