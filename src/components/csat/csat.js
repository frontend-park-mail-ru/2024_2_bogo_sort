import template from './csat.hbs';

export class Csat {
    constructor(questions) {
        this.questions = questions;
        this.current = 0;
    }

    render() {
        const data = this.questions[this.current];
        this.current++;
        if(this.current === this.questions.length){
            return null;
        }
        return template({question: data.question, id: data.id});
    }


}