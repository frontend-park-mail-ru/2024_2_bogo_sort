import ajax from '@modules/ajax';
import template from './priceHistory.hbs';
import { ResponseAdvertPriceHistory } from '@modules/ajaxTypes';
import { Points } from './priceHistoryTypes';
import { timestampFormatter } from '@utils/timestampFormatter';

export class PriceHistoryComponent{
    history: ResponseAdvertPriceHistory | null = null;
    paddingLeft = 50;
    paddingRight = 50;
    paddingTop = 50;
    paddingBottom = 50;
    width: number | null = null;
    height: number | null = null;
    ctx: CanvasRenderingContext2D | null = null;
    lowestPrice: number | null = null;
    heighestPrice: number | null = null;
    priceHistory: number[] = [];
    priceHistoryTimestamp: string[] = [];

    async checkIfPriceChanged(advertId: string) {
        this.history = await ajax.get<ResponseAdvertPriceHistory>(`/history/${advertId}`);
        if(this.history === null) {
            return 'noChange';
        }
        return this.history[0].NewPrice > this.history[0].OldPrice ? 'higher' : 'lower';
    }

    async renderPriceHistory(advertId: string, advertCreationTimestamp: string) {
        if(this.history === null) {
            this.history = await ajax.get<ResponseAdvertPriceHistory>(`/history/${advertId}`);
            if(this.history === null) {
                return;
            }
        }
        let currentPrice: number = 0;
        this.history.forEach((stamp, index) => {
            if(index === 0) {
                currentPrice = stamp.NewPrice;
                this.priceHistory.push(currentPrice);
            }
            this.priceHistoryTimestamp.push(stamp.ChangedAt);
            this.priceHistory.push(stamp.OldPrice);
        });
        this.priceHistoryTimestamp.push(advertCreationTimestamp);

        this.priceHistory = this.priceHistory.reverse();
        this.priceHistoryTimestamp = this.priceHistoryTimestamp.reverse();

        this.priceHistoryTimestamp = this.priceHistoryTimestamp.map((timestamp, i) => {
            return timestampFormatter(timestamp, false);
        });

        if(this.priceHistory.length > 6) {
            const lenght = this.priceHistory.length;
            this.priceHistory = this.priceHistory.slice(length - 6, lenght);
            this.priceHistoryTimestamp = this.priceHistoryTimestamp.slice(length - 6, lenght);
        }

        
        this.lowestPrice = Math.min(...this.priceHistory);
        this.heighestPrice = Math.max(...this.priceHistory);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML += template({currentPrice: currentPrice, lowestPrice: this.lowestPrice, heighestPrice: this.heighestPrice});
        const priceHistoryElement = tempDiv.firstElementChild;

        const canvas = priceHistoryElement?.querySelector<HTMLCanvasElement>('.price-history__canvas');
        if(canvas) {
            this.fillCanvas(canvas);
        }

        return priceHistoryElement;
    }

    fillCanvas(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        if(!this.ctx) {
            return;
        }

        this.width = canvas.width;
        this.height = canvas.height;

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawAxes();
        this.drawCurve();
    }

    priceToY(price: number) {
        if(!(this.height && this.heighestPrice && this.lowestPrice)) {
            return;
        }
        const scale = (this.height - this.paddingBottom - this.paddingTop) / (this.heighestPrice - this.lowestPrice);
        return this.height - this.paddingBottom - (price - this.lowestPrice)*scale;
    }

    indexToX(i: number) {
        if(!this.width) {
            return;
        }
        const step = (this.width - this.paddingLeft - this.paddingRight) / (this.priceHistory.length - 1);
        return this.paddingLeft + i * step;
    }

    drawRoundedRect(x: number, y: number, width: number, height: number, radius: number) {
        if(!this.ctx) {
            return;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    getCurvePoints(pts: Points, tension=0.5, numOfSegments=16) {
        let _pts = [], x, y, t1x, t2x, t1y, t2y;
        let rlen = pts.length;

        _pts.push(pts[0]);
        for (let i = 0; i < rlen; i++) {
            _pts.push(pts[i]);
        }
        _pts.push(pts[rlen-1]);

        let res = [];

        for (let i = 1; i < _pts.length - 2; i++) {
            let p0 = _pts[i-1];
            let p1 = _pts[i];
            let p2 = _pts[i+1];
            let p3 = _pts[i+2];

            t1x = (p2.x - p0.x)*tension;
            t2x = (p3.x - p1.x)*tension;
            t1y = (p2.y - p0.y)*tension;
            t2y = (p3.y - p1.y)*tension;

            for (let t = 0; t <= numOfSegments; t++) {
                let st = t / numOfSegments;

                let c1 =   2*st*st*st - 3*st*st + 1; 
                let c2 = -(2*st*st*st - 3*st*st);
                let c3 =   st*st*st - 2*st*st + st; 
                let c4 =   st*st*st -   st*st;

                x = c1*p1.x + c2*p2.x + c3*t1x + c4*t2x;
                y = c1*p1.y + c2*p2.y + c3*t1y + c4*t2y;

                res.push({x:x, y:y});
            }
        }
        return res;
    }

    drawCurve() {
        if(!this.ctx){ 
            return;
        }
        const points = this.priceHistory.map((price, i) => {
            return { x: this.indexToX(i)!, y: this.priceToY(price)! - 10, price: price };
        });

        const curve = this.getCurvePoints(points, 0.5, 20);

        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#809cff';
        this.ctx.beginPath();
        this.ctx.moveTo(curve[0].x, curve[0].y);
        curve.forEach(point => {
            this.ctx?.lineTo(point.x, point.y);
        })
        this.ctx.stroke();

        this.ctx.fillStyle = '000';
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'center';

        points.forEach(p => {
            if(!p.x || !p.y || !this.ctx) {
                return;
            } 
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
            this.ctx.fillStyle = '#0038ff';
            this.ctx.fill();

            this.ctx.fillStyle = '#e6e6e6';
            this.ctx.textBaseline = 'bottom';
            const textWidth = (this.ctx.measureText(String(p.price)).width);
            this.drawRoundedRect(p.x - textWidth / 2 - 12,
                              p.y - 20 - 16 - 4,
                              textWidth + 12 * 2,
                              16 + 4 * 2,
                              4);
            this.ctx.fillStyle = '#000000';
            this.ctx.fillText(p.price + ' ₽', p.x, p.y - 20);
        }); 
    }

    drawAxes() {
        if(!this.ctx || !this.height || !this.width) {
            return;
        }
        this.ctx.strokeStyle = '#cccccc';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();

        this.ctx.moveTo(this.paddingLeft, this.height - this.paddingBottom);
        this.ctx.lineTo(this.width - this.paddingRight, this.height - this.paddingBottom);
        this.ctx.stroke();

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'top';
        this.ctx.font = '16px sans-serif';
        this.ctx.fillStyle = '000';
        this.priceHistoryTimestamp.forEach((timestamp, i) => {
            const x = this.indexToX(i);
            const y = this.priceToY(this.priceHistory[i]);
            if(!x || !y || !this.ctx || !this.height) {
                return;
            }
            this.ctx.strokeStyle = 'eee';
            this.ctx.setLineDash([10, 3]);
            this.ctx.beginPath();
            // this.ctx.moveTo(x, this.paddingTop - 10);
            this.ctx.moveTo(x, y - 10);
            this.ctx.lineTo(x, this.height - this.paddingBottom);
            this.ctx.stroke();

            this.ctx.fillText(timestamp, x, this.height - this.paddingBottom + 10);
        });
        this.ctx.setLineDash([]);
    }
};