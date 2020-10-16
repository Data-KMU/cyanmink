import { Area, Corridor } from '../interfaces';
import { Feature } from 'geojson';

export function entityToFeature(entity: Area | Corridor) {
  return {
    type: 'Feature',
    geometry: {
      type: entity.type === 'Area' ? 'Polygon' : 'LineString',
      coordinates: entity.coordinates,
    },
    properties: entity.properties != null ? entity.properties : {},
  };
}

export function featureToEntity(feature: Feature, type: string): Area | Corridor | undefined {
  switch (type) {
    case 'Area': {
      return {
        type: 'Area',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        elevation: 0,
        height: 0,
        coordinates: 'coordinates' in feature.geometry ? feature.geometry.coordinates : [],
        properties: {
          name: feature.properties && feature.properties.name ? feature.properties.name : 'Area',
        },
        _id: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      };
    }
    case 'Corridor': {
      return {
        type: 'Corridor',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        shape: 'circular',
        coordinates: 'coordinates' in feature.geometry ? feature.geometry.coordinates : [],
        properties: {
          name:
            feature.properties && feature.properties.name ? feature.properties.name : 'Corridor',
        },
        _id: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      };
    }
    default: {
      console.error('Not a valid type');
      break;
    }
  }
}

