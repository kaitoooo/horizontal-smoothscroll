import '../style/style.scss';
import picturefill from 'picturefill';
picturefill();
import Layout from './components/layout';
import Scroll from './components/h-scroll';
// import Mouse from './components/mouse';
const APP = window.APP || {};

export default class App {
    constructor() {
        window.addEventListener(
            'DOMContentLoaded',
            () => {
                window.APP = APP;
                APP.Layout = new Layout();
            },
            false
        );
        window.onload = () => {
            this.init();
        };
    }
    init() {
        new Scroll();
        // APP.Mouse = new Mouse();
        // APP.Mouse.init();
    }
}
new App();
