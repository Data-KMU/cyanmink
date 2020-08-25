import { Area } from '../stores/dashboard/map';

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

export function getArea(id: string): Promise<Area> {
  return axios
    .get(`https://redcat.taaja.io/v1/extension/${id}`)
    .then((res: any) => {
      return res;
    })
    .catch((e) => {
      if (e.name == 'Redcat Area Error') {
        console.error(e.message + '. code = ' + e.code);
      }
    });
}
