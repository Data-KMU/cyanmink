import { Area, Corridor } from '../interfaces';

export function spatialJSONToGeoJSON(entity: Area | Corridor) {
  return {
    type: 'Feature',
    geometry: {
      type: entity.type === 'Area' ? 'Polygon' : 'LineString',
      coordinates: entity.coordinates,
    },
    properties: entity.properties != null ? entity.properties : {},
  };
}
