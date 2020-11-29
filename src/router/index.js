
import Layout from '../pages/Layout'
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import Page4 from '../pages/Page4'
import App from '../App.vue'

const routes = [
    // 动态路径参数 以冒号开头
    {
        path: '/', component: App, redirect: '/app', children: [
            {
                path: 'app', component: Layout,
                children: [
                    {
                        path: '', component: HomePage,
                    },
                    {
                        path: 'key1', component: Page1,
                    },
                    {
                        path: 'key2', component: Page2,
                    },
                    {
                        path: 'key3', component: Page3,
                    },
                    {
                        path: 'key4', component: Page4,
                    }
                ]
            }
        ]
    }
]
export default routes