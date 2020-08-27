import { FeatureOf, Polygon } from '@nebula.gl/edit-modes';

export function areaToFeature(area: any): FeatureOf<Polygon> {
  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: area.coordinates,
    },
    properties: area.properties != null ? area.properties : {},
  };
}
