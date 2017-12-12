import Layout from './app/layout';

const routeConfig = [
    {
        path: window.location.href.indexOf('h6')>-1?'/':'/mofang/index.html',
        component: Layout
    }
];

export default routeConfig;