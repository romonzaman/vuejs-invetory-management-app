import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
const Login = () => import("../views/LoginView.vue")
const LogoutView = () => import("../views/LogoutView.vue")
const Signup = () => import("../views/SignupView.vue")
const ForgotPassword = () => import("../views/ForgotPassword.vue")
const DashboardView = () => import("../views/DashboardView.vue")
const ProductsView = () => import("../views/ProductsView.vue")
const AddProduct = () => import("../views/AddProduct.vue")
const ProductDetails = () => import("../views/ProductDetails.vue")
const UserProfile = () => import("../views/UserProfile.vue")
import { useAuthStore } from "../stores/AuthStore";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    { path: "/login", name: "Login", component: Login },
    { path: "/logout", name: "Logout", component: LogoutView },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/profile", name: "Profile", component: UserProfile },
    {
      path: "/forgotpassword",
      name: "ForgotPassword",
      component: ForgotPassword,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: "/products", name: "Products", component: ProductsView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: "/products/:id", name: "ProductDetails", component: ProductDetails,
      meta:{
        requiresAuth: true
      }
    },
    {
      path: "/products/create", name: "CreateProduct", component: AddProduct,
      meta:{
        requiresAuth: true
      }
    }
  
  ]
})

router.beforeEach((to, from, next) => {

  const auth = useAuthStore()

  if(to.meta.requiresAuth && auth.accessToken == null ){
      next('/login')
  }else{
      next()
  }
})
export default router
