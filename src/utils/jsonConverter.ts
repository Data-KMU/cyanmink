import { Area, Corridor, Feature } from '../interfaces';

export function entityToFeature(entity: Area | Corridor) {
  return {
    type: 'Feature',
    geometry: {
      type: entity.type === 'Area' ? 'Polygon' : 'LineString',
      coordinates: entity.coordinates,
    },
    properties: entity.properties != null ? entity.properties : {},
    id: entity._id,
  };
}

export function featureToEntity(feature: Feature): Area | Corridor {
  switch (feature.geometry.type) {
    case 'Polygon': {
      return {
        type: 'Area',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        elevation: 0,
        height: 0,
        coordinates: feature.geometry.coordinates,
        properties: {
          name: feature.properties && feature.properties.name ? feature.properties.name : 'Area',
        },
        _id: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      };
    }
    case 'LineString': {
      return {
        type: 'Corridor',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        shape: 'circular',
        coordinates: feature.geometry.coordinates,
        properties: {
          name:
            feature.properties && feature.properties.name ? feature.properties.name : 'Corridor',
        },
        _id: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      };
    }
    default: {
      console.error('Not a valid type');

      return {
        type: 'Area',
        priority: 1000,
        extensionBehaviour: 'trafficZone',
        created: Date.now(),
        elevation: 0,
        height: 0,
        coordinates: [],
        properties: {
          name: 'Error Area',
        },
        _id: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
      };
    }
  }
}

