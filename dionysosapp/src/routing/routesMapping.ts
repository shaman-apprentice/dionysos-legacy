import React from 'react';

const Home = React.lazy(() => import('./routes/home'));
const WineOverview = React.lazy(() => import('./routes/wine-overview'));
const EditWine = React.lazy(() => import('./routes/edit-wine'));

export const routeMapping: {[path: string]: RouteDescription} = {
  '/': {
    label: 'Home',
    component: Home,
  },
  '/wine-overview': {
    label: 'View wines',
    component: WineOverview,
  },
  '/add-wine': {
    label: 'Add a wine',
    component: EditWine,
  },
}

interface RouteDescription {
  label: string,
  component: React.ComponentType,
}
