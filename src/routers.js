import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue'
import Login from './login.vue'
Vue.use(VueRouter);
const router = new VueRouter({
    mode:'hash',//hash 打包需要使用hash 无#： history
    routes: [
        {//前台路由配置
            path:'/',
            component:App

        },
        {//前台路由配置
            path:'/login',
            component:Login

        }
    ]
})

router.beforeEach((to, from, next) => {
    console.log(`路由到：${to.path}`)
    next();
});

router.afterEach(route => {
    
})
export default router
