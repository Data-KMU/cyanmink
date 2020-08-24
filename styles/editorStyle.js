import { RENDER_STATE } from 'react-map-gl-draw';

export function getEditHandleStyle({ feature, state }) {
  switch (state) {
    case RENDER_STATE.SELECTED:
    case RENDER_STATE.HOVERED:
    case RENDER_STATE.UNCOMMITTED:
      return {
        fill: 'rgb(255,255,255)',
        fillOpacity: 1,
        stroke: 'rgb(251, 0, 0)',
        strokeWidth: 2,
        r: 7,
      };

    default:
      return {
        fill: 'rgb(255,255,255)',
        fillOpacity: 1,
        stroke: 'rgb(251, 0, 0)',
        strokeWidth: 2,
        r: 5,
      };
  }
}

export function getFeatureStyle({ feature, index, state }) {
  switch (state) {
    case RENDER_STATE.SELECTED:
    case RENDER_STATE.HOVERED:
    case RENDER_STATE.UNCOMMITTED:
    case RENDER_STATE.CLOSING:
      return {
        stroke: 'rgb(251, 0, 0)',
        strokeWidth: 2,
        fill: 'rgb(251, 0, 0)',
        fillOpacity: 0.3,
        strokeDasharray: '4,2',
      };

    default:
      return {
        stroke: 'rgb(60, 0, 255)',
        strokeWidth: 2,
        fill: 'rgb(60, 0, 255)',
        fillOpacity: 0.2,
      };
  }
}
