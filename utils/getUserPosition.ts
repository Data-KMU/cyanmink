import pick from 'lodash/pick';

export function getUserPosition(): Promise<Pick<Coordinates, 'latitude' | 'longitude'>> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(pick(position.coords, ['longitude', 'latitude']));
      },
      ({ code, message }) =>
        reject(Object.assign(new Error(message), { name: 'PositionError', code })),
      { enableHighAccuracy: true },
    );
  });
}
