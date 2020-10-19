import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronDownIcon } from '@modulz/radix-icons';

import styles from '../styles/FeatureList.module.css';

import { useMapStore } from '../stores/map';
import { Feature } from '../interfaces';

type FeatureItemProps = {
  feature: Feature
}

function FeatureItem({ feature }: FeatureItemProps) {
  const [active, setActive] = useState(false);

  return (
    <li className={styles.item} onClick={() => setActive(!active)}>
      <h4>{feature.properties.name}</h4>
      <button>{active ? <ChevronLeftIcon/> : <ChevronDownIcon/>}</button>
      {active &&
      <div className={styles.infos}>
        <p>Height: {feature.properties.height}</p>
        <p>Elevation: {feature.properties.elevation}</p>
        <p>Ext. Behaviour: {feature.properties.extensionBehaviour}</p>
        <p>Priority: {feature.properties.priority}</p>
      </div>
      }
    </li>
  );
}

function FeatureList() {
  const [active, setActive] = useState(false);

  const features = useMapStore((state) => state.features);
  const featuresCopy = [...features];

  console.log(features);
  return (
    <section className={styles.container}
             style={active ? { transform: 'translateX(0px)' } : { transform: 'translateX(380px)' }}>
      <button onClick={() => setActive(!active)}><p>Entities</p></button>
      <div className={styles.popout}>
        <h3>Entities</h3>
        <ul className={styles.list}>
          {featuresCopy.map(feature => <FeatureItem feature={feature}/>)}
        </ul>
      </div>
    </section>
  );
}

export default FeatureList;
