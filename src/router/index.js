import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
const Login = () => import("../views/LoginView.vue")
const Signup = () => import("../views/SignupView.vue")
const ForgotPassword = () => import("../views/ForgotPassword.vue")
const DashboardView = () => import("../views/DashboardView.vue")
const ProductsView = () => import("../views/ProductsView.vue")
const AddProduct = () => import("../views/AddProduct.vue")
const ProductDetails = () => import("../views/ProductDetails.vue")


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    { path: "/login", name: "Login", component: Login },
    { path: "/logout", name: "Logout", component: Login },
    { path: "/signup", name: "Signup", component: Signup },
    {
      path: "/forgotpassword",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/dashboard", name: "Dashboard", component: DashboardView
    },
    {
      path: "/products", name: "Products", component: ProductsView
    },
    {
      path: "/products/:id", name: "ProductDetails", component: ProductDetails
    },
    {
      path: "/products/create", name: "CreateProduct", component: AddProduct
    }
  
  ]
})

export default router
