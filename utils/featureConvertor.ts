import { Area, Corridor } from '../interfaces';
import { FeatureOf, LineString, Polygon } from '@nebula.gl/edit-modes';

export function spatialJSONToGeoJSON(
  feature: Area | Corridor,
): FeatureOf<Polygon> | FeatureOf<LineString> {
  return {
    type: 'Feature',
    geometry: {
      type: feature.type === 'Area' ? 'Polygon' : 'LineString',
      coordinates: feature.coordinates,
    },
    properties: feature.properties != null ? feature.properties : {},
  };
}
