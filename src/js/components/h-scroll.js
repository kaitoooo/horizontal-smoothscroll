const imagesLoaded = require('imagesloaded');
import { clamp, map } from '../utils/utils';
import LocomotiveScroll from 'locomotive-scroll';

export default class Scroll {
    constructor() {
        this.init();
    }
    init() {
        // 画像の読み込み開始
        const preloadImages = () => {
            return new Promise((resolve) => {
                imagesLoaded(
                    document.querySelectorAll('img'),
                    {
                        background: true,
                    },
                    resolve
                );
            });
        };
        preloadImages().then(() => {
            // 画像を全て読み込んだら実行
            this.scrollEvent();
        });
    }
    scrollEvent() {
        const lscroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            direction: 'horizontal',
        });

        // スクロールするときに画像を拡大縮小する
        lscroll.on('scroll', (obj) => {
            for (const key of Object.keys(obj.currentElements)) {
                if (obj.currentElements[key].el.classList.contains('gallery__item--img-inner')) {
                    const progress = obj.currentElements[key].progress;
                    const scaleVal = progress < 0.5 ? clamp(map(progress, 0, 0.5, 0.2, 1), 0.2, 1) : clamp(map(progress, 0.5, 1, 1, 0.2), 0.2, 1);
                    obj.currentElements[key].el.parentNode.style.transform = `scale(${scaleVal})`;
                }
            }
        });
        lscroll.update();
    }
}
