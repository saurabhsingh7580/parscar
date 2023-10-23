import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';

export const orientation = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const dimensions = Dimensions.get('window');
    if (dimensions.width > dimensions.height) {
      setOrientation('landscape');
      // console.log('landscape');
    } else {
      setOrientation('portrait');
      // console.log('portrait');
    }

    const onChange = ({window}) => {
      if (window.width > window.height) {
        setOrientation('landscape');
        // console.log('landscape');
      } else {
        setOrientation('portrait');
        // console.log('portrait');
      }
    };

    Dimensions.addEventListener('change', onChange);

    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  }, []);
};
