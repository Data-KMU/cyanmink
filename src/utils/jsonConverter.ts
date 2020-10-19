import { Area, Corridor, Feature } from '../interfaces';

export function entityToFeature(entity: Area | Corridor) {
  if ('elevation' in entity) {
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: entity.coordinates,
      },
      properties: {
        name: entity.properties.name,
        elevation: entity.elevation,
        extensionBehaviour: entity.extensionBehaviour,
        height: entity.height,
        priority: entity.priority,
      },
      id: entity._id,
    };
  } else {
    return {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: entity.coordinates,
      },
      properties: {
        name: entity.properties.name,
        extensionBehaviour: entity.extensionBehaviour,
        priority: entity.priority,
      },
      id: entity._id,
    };
  }
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
          name: 'Test name',
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
          name: 'Test name',
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

