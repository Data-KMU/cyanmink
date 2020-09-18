import { Area, Corridor } from '../interfaces';
import { FeatureOf } from '@nebula.gl/edit-modes';

export function spatialJSONToGeoJSON(feature: Area | Corridor): FeatureOf<any> {
  return {
    type: 'Feature',
    geometry: {
      type: feature.type === 'Area' ? 'Polygon' : 'LineString',
      coordinates: feature.coordinates,
    },
    properties: feature.properties != null ? feature.properties : {},
  };
}
