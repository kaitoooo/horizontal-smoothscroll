import { throttle } from '../utils/throttle';
export default class Layout {
    constructor() {
        this.winSize = {
            wd: window.innerWidth,
            wh: window.innerHeight,
        };
        this.spWidth = 768;
        this.mql = window.matchMedia('screen and (max-width: 768px)');
        this.isMobile = false;
        this.ua = window.navigator.userAgent.toUpperCase();
        this.isIe = this.ua.indexOf('MSIE') === -1 && this.ua.indexOf('TRIDENT') === -1 ? false : true;
        this.init();
    }
    init() {
        this.checkBreakPoint();
        this.mql.addListener(this.checkBreakPoint.bind(this));
        this.handleEvents();
    }
    checkBreakPoint() {
        // ブラウザチェック
        this.isMobile = this.mql.matches ? true : false;
        this.ua = window.navigator.userAgent.toUpperCase();
        this.isIe = this.ua.indexOf('MSIE') === -1 && this.ua.indexOf('TRIDENT') === -1 ? false : true;
    }
    handleResize() {
        // リサイズ処理
        if (this.winSize.wd !== window.innerWidth) {
            this.winSize = {
                wd: window.innerWidth,
                wh: window.innerHeight,
            };
            this.checkBreakPoint();
        }
    }
    handleEvents() {
        window.addEventListener('resize', throttle(this.handleResize.bind(this)), false);
    }
}
