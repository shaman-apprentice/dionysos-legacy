export const navigationRoutes = [
  { label: 'Home', value: '/' },
  { label: 'View wines', value: '/wine-overview' },
  // todo: A distinction between editing and adding a wine is a nice to have for the future
  // todo: Navigating from edit-wine to add-wine doesn't work with this solution, as onValueChanged gets not executed / selected value stays the same
  // todo: Check within `updateLocation` due to that is also not too nice
  { label: 'Add a wine', value: '/edit-wine/-1' },
];

// todo: As location is handled different in web, android and ios an (3) integration test for this logic would be useful on component level
export const getValueFromLocation = (path: string) => {
  if (path === '/wine-overview')
    return '/wine-overview';
  if (path.startsWith('/edit-wine'))
    return '/edit-wine/-1';

  return '/home';
}

export const updateLocation = (currentLoc: string, newLoc: string, update: Function) => {
  if (currentLoc.split('/')[1] === newLoc.split('/')[1]) // e.g. /edit-wine/-1 -> /edit-wine/2
    return;

  update(newLoc);
}
