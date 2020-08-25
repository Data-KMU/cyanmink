import { Feature } from 'geojson';
import { Area } from '../stores/dashboard/map';

export function areaToFeature(area: Area): Feature {
  return {
    type: 'Feature',
    geometry: area.coordinates,
    properties: area.properties,
  };
}
