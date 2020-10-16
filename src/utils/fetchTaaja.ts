import { Area, Coords, Corridor, PurpleTigerRes } from '../interfaces';

export function getSpatialEntitiesIDs (coords : Coords): Promise<PurpleTigerRes> {
  return fetch(`https://purpletiger.taaja.io/v1/encode/position?longitude=${coords.longitude}&latitude=${coords.longitude}`)
    .then(res => res.json())
}

export function getSpatialEntities (id : string): Promise<Area | Corridor> {
  return fetch(`https://redcat.taaja.io/v1/extension/${id}`)
    .then(res => res.json())
}
