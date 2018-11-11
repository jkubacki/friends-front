export function getRouteLocation(
  currentLocation,
  storedLocation,
  initialBackground,
) {
  let location = currentLocation;

  if (initialBackground) {
    location = initialBackground;
  } else if (
    storedLocation &&
    currentLocation.state &&
    currentLocation.state.modal
  ) {
    location = storedLocation;
  }
  return location;
}
