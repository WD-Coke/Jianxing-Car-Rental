import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from "../views/HomePage";
import Lease from "../views/Lease";
import Rent from "../views/Rent";
import Store from "../views/Store";
import Active from "../views/Active";
import Order from "../views/Order";
import Login from "../views/logInRegister/Login";
import Register from "../views/logInRegister/Register";
import Join from "../views/Join";
import driving from "../components/actives/driving";
import free from "../components/actives/free";
import ski from "../components/actives/ski";
import self from "../components/actives/self";
import Car from "../views/CarList";
import Storelist from "../views/Storelist";

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/HomePage',
  },
  {
    path: '/HomePage',
    component: HomePage
  },
  {
    path: '/Lease',
    component: Lease
  },
  {
    path: '/Car/:name',
    component: Car
  },
  {
    path: '/Store/:name',
    component: Storelist
  },
  {
    path: '/Rent',
    component: Rent
  },
  {
    path: '/Store',
    component: Store
  },
  {
    path: '/Active',
    component: Active,
  },
  {
    path: '/driving',
    component: driving
  },
  {
    path: '/ski',
    component: ski
  },
  {
    path: '/free',
    component: free
  },
  {
    path: '/self',
    component: self
  },
  {
    path: '/Order',
    component: Order,
  },
  {
    path: '/Join',
    component: Join
  },
  {
    path: '/Login',
    component: Login
  },
  {
    path: '/Register',
    component: Register
  },
]

const router = new VueRouter({
  routes
})

export default router
