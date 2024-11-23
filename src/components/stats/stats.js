import template from './stats.hbs';
import ajax from '../../modules/ajax';

export class Stats {

   async render() {
        const data = await ajax.get('/stats');
//         this.mock = {
//             survey: [
//                 {
//                     title: 'MainPage',
//                     questions: [
//                         {
//                             title: 'Vopros 1',
//                             avg: 1.23,
//                             id: 1,
//                             answer_stats: [
//                                 {
//                                     value: 1,
//                                     number: 10,
//                                 },
//                                 {
//                                     value: 2,
//                                     number: 8,
//                                 },
//                                 {
//                                     value: 3,
//                                     number: 1,
//                                 },
//                                 {
//                                     value: 4,
//                                     number: 2,
//                                 },
//                                 {
//                                     value: 5,
//                                     number: 0,
//                                 },
//                             ]
//                         },
//                         {
//                             title: 'Vopros 2',
//                             avg: 3.21,
//                             id: 2,
//                             answer_stats: [
//                                 {
//                                     value: 1,
//                                     number: 2,
//                                 },
//                                 {
//                                     value: 2,
//                                     number: 3,
//                                 },
//                                 {
//                                     value: 3,
//                                     number: 10,
//                                 },
//                                 {
//                                     value: 4,
//                                     number: 8,
//                                 },
//                                 {
//                                     value: 5,
//                                     number: 4,
//                                 },
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     title: 'MainPage',
//                     questions: [
//                         {
//                             title: 'Vopros 1',
//                             avg: 1.23,
//                             id: 1,
//                             answer_stats: [
//                                 {
//                                     value: 1,
//                                     number: 10,
//                                 },
//                                 {
//                                     value: 2,
//                                     number: 8,
//                                 },
//                                 {
//                                     value: 3,
//                                     number: 1,
//                                 },
//                                 {
//                                     value: 4,
//                                     number: 2,
//                                 },
//                                 {
//                                     value: 5,
//                                     number: 0,
//                                 },
//                             ]
//                         },
//                         {
//                             title: 'Vopros 2',
//                             avg: 3.21,
//                             id: 2,
//                             answer_stats: [
//                                 {
//                                     value: 1,
//                                     number: 2,
//                                 },
//                                 {
//                                     value: 2,
//                                     number: 3,
//                                 },
//                                 {
//                                     value: 3,
//                                     number: 10,
//                                 },
//                                 {
//                                     value: 4,
//                                     number: 8,
//                                 },
//                                 {
//                                     value: 5,
//                                     number: 4,
//                                 },
//                             ]
//                         }
//                     ]
//                 },
//             ]
//         }

        return template(data);
    }

    addHistogram() {
        const canvases = document.querySelectorAll('.question__histogram');
        canvases.forEach(canvas => {
            const questionTitle = canvas.parentElement.parentElement.querySelector('.question__title');
            const surveyTitle = questionTitle.parentElement.parentElement.parentElement.querySelector('.stat__survey-title');
            const [data, labels] = this.getAnswerStats(this.mock, questionTitle.innerText, surveyTitle.innerText);
            const ctx = canvas.getContext('2d');

            const barWidth = 50;
            const barMargin = 10;
            const chartHeight = canvas.height - 40;
            const maxValue = Math.max(...data);

            ctx.fillStyle = '#406AFF';
            ctx.strokeStyle = '#0038FF';
            ctx.lineWidth = 1;

            data.forEach((value, index) => {
                const barHeight = (value / maxValue) * chartHeight;
                const x = 20 + index * (barWidth + barMargin);
                const y = chartHeight + 20 - barHeight;

                ctx.fillRect(x, y, barWidth, barHeight);
                ctx.strokeRect(x, y, barWidth, barHeight);

                ctx.fillStyle = '#809CFF';
                ctx.font = '12px Arial';
                ctx.fillText(labels[index], x, chartHeight + 35);
                ctx.fillText(value, x + barWidth / 2 - 5, y - 5);
            });
        });
    }

    getAnswerStats(data, questionTitle, surveyTitle) {
        const survey = data.survey.find(s => s.title === surveyTitle);
        if (!survey) {
            return null;
        }

        const question = survey.questions.find(q => q.title === questionTitle);
        if (!question) {
            return null;
        }

        const numberArray = [];
        const valueArray = [];
        question.answer_stats.forEach(obj => {
            numberArray.push(obj.number);
            valueArray.push(obj.value);
        });

        return [numberArray, valueArray];
    }
}