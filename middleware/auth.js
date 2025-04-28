export default defineNuxtRouteMiddleware((to, from) => {
  const publicRoutes = ['/login', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(to.path);
  if (process.client) {
    const user = localStorage.getItem('user');

    if (!user && !isPublicRoute) {
      return navigateTo('/login');
    }

    if (user && to.path === '/login') {
      return navigateTo('/');
    }
  }
})
