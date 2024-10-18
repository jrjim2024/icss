const routes = [
  {
    path: "/",
    redirect: "/frontDesk",
  },
  {
    path: "/frontDesk",
    name: "frontDesk",
    components: {
      default: () => import("@/views/frontPage.vue"),
    },
    children: loadFrontDeskRoutes("@/views/frontFolder"),
  },
  {
    path: "/backStage",
    name: "backStage",
    components: {
      default: () => import("@/views/backPage.vue"),
    },
    children: loadBackStageRoutes("@/views/backFolder"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

function loadFrontDeskRoutes() {
  const modules = import.meta.glob("/src/views/frontFolder/*.vue");
  return Object.keys(modules).map((filePath) => {
    const routeName = filePath.match(/\/(\w+)\.vue$/)?.[1] || "";
    return {
      path: routeName,
      name: routeName,
      component: modules[filePath],
    };
  });
}

function loadBackStageRoutes() {
  const modules = import.meta.glob("/src/views/backFolder/*.vue");
  return Object.keys(modules).map((filePath) => {
    const routeName = filePath.match(/\/(\w+)\.vue$/)?.[1] || "";
    return {
      path: routeName,
      name: routeName,
      component: modules[filePath],
    };
  });
}

export default routes;
