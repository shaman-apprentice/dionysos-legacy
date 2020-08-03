import React from 'react';

const WineOverview = React.lazy(() => import('./routes/wine-overview'));
const EditWine = React.lazy(() => import('./routes/edit-wine'));

export const routeMapping: {[path: string]: RouteDescription} = {
  '/wine-overview': {
    label: 'View wines',
    component: WineOverview,
  },
  '/edit-wine/:RowKey': {
    label: 'Add a wine',
    component: EditWine,
  },
}

interface RouteDescription {
  label: string,
  component: React.ComponentType,
}
