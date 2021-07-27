import { gsap } from 'gsap';
import { lerp } from '../utils/utils';
import { throttle } from '../utils/throttle';

export default class Mouse {
    constructor() {
        this.winSize = APP.Layout.winSize;
        this.elms = {
            cursor: document.querySelector('[data-cursor="target"]'),
            area: document.querySelector('[data-content="area"]'),
        };
        this.rect = null;

        this.mouse = {
            x: 0,
            y: 0,
        };
        this.styles = {
            transX: {
                previous: 0,
                current: 0,
                amt: 0.2,
            },
            transY: {
                previous: 0,
                current: 0,
                amt: 0.2,
            },
        };
        this.hovFlag = false;
        this.init();
    }
    init() {
        this.getRect();
        this.handleEvents();
        this.enter();
        this.leave();
        gsap.config({
            force3D: true,
        });
    }
    enter() {
        this.elms.area.addEventListener('mouseenter', () => {
            this.visible();
        });
    }
    leave() {
        this.elms.area.addEventListener('mouseleave', () => {
            this.hidden();
        });
    }
    getRect() {
        // マウスカーソルの大きさ取得
        this.rect = this.elms.cursor.getBoundingClientRect();
    }
    visible() {
        // マウスが現れる処理
        this.render();
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.ease',
            },
        });
        tl.to(this.elms.cursor, {
            duration: 0.45,
            opacity: 1,
        });
        tl.play();
    }
    hidden() {
        // マウスが消える処理
        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.ease',
            },
        });
        tl.to(this.elms.cursor, {
            duration: 0.45,
            opacity: 0,
        });
        tl.play();
    }
    render() {
        // 描写
        this.styles['transX'].current = this.mouse.x - this.rect.width * 0.5;
        this.styles['transY'].current = this.mouse.y - this.rect.height * 0.5;
        for (let key in this.styles) {
            // 位置(transX, transY)を計算
            this.styles[key].previous = lerp(this.styles[key].previous, this.styles[key].current, this.styles[key].amt);
        }
        // 位置(transX, transY)をセット
        gsap.set(this.elms.cursor, {
            x: `${this.styles['transX'].previous}px`,
            y: `${this.styles['transY'].previous}px`,
        });
        this.requestId = requestAnimationFrame(this.render.bind(this));
    }
    cancelAnimate() {
        // アニメーションキャンセル
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = null;
        }
    }
    handleMouse(e) {
        // マウスカーソル位置
        if (!e) e = window.event;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }
    handleResize() {
        // リサイズ処理
        if (this.winSize.wd !== window.innerWidth) {
            this.winSize = APP.Layout.winSize;
            this.getRect();
            if (APP.Layout.isMobile) {
                // スマホはキャンセル
                this.cancelAnimate();
            } else {
                this.render();
            }
        }
    }
    handleEvents() {
        // イベント登録
        document.addEventListener('mousemove', this.handleMouse.bind(this), false);
        window.addEventListener('resize', throttle(this.handleResize.bind(this)), false);
    }
}
