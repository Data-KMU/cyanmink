import { Area } from '../stores/dashboard/map';

import axios from 'axios';

export function getSpacialEntities(coords: Pick<Coordinates, 'latitude' | 'longitude'>): any {
  return axios
    .get(
      `https://purpletiger.taaja.io/v1/encode/position?longitude=${coords.longitude}&latitude=${coords.longitude}`,
    )
    .then((res: any) => {
      const spatialEntities = res.data.spatialEntities;
      const ids: string[] = [];

      spatialEntities.forEach((entity: any) => ids.push(entity._id));

      return ids;
    })
    .then((ids: string[]) => {
      const areas: Area[] = [];

      ids.forEach((id) =>
        axios
          .get(`https://redcat.taaja.io/v1/extension/${id}`)
          .then((res: any) => areas.push(res.data)),
      );

      return areas;
    });
}
