export default defineNuxtRouteMiddleware(() => {
    const astros = useAstrosStore();

    if (!astros.hasData) {
      return navigateTo('/')
    }
  })
