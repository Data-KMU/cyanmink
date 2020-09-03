import axios from 'axios';

export function getSpacialEntities(
  coords: Pick<Coordinates, 'latitude' | 'longitude'>,
): Promise<string[]> {
  return axios
    .get(
      `https://purpletiger.taaja.io/v1/encode/position?longitude=${coords.longitude}&latitude=${coords.longitude}`,
    )
    .then((res: any) => {
      const spatialEntities = res.data.spatialEntities;
      const ids: string[] = [];

      spatialEntities.forEach((entity: any) => ids.push(entity._id));

      return ids;
    });
}

export function getFeature(id: string): Promise<any> {
  return axios
    .get(`https://5f47ac3c95646700168d9b0b.mockapi.io/v1/extension`)
    .then((res: any) => {
      return res;
    })
    .catch((e) => {
      if (e.name == 'Redcat Area Error, ID: ' + id) {
        console.error(e.message + '. code = ' + e.code);
      }
    });
}
