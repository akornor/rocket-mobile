import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import FadeIn from '@expo/react-native-fade-in-image';
import styles from './styles/Casts';
import { TMDB_IMG_URL } from '../../constants/Api';
import _ from 'lodash';

const Casts = ({ info, getTabHeight }) => {
  let computedHeight = (80 + 15) * info.casts.cast.length; // (castImage.height + castContainer.marginBottom)
  computedHeight += 447 + 40; // Header height + container ((20 paddingVertical) = 40)
  let casts = _.take(info.casts.cast, 6); // show top 6 casts


  return (
    <View style={styles.container} onLayout={getTabHeight.bind(this, 'casts', computedHeight)}>
      {
        casts.map(item => (
          <View key={item.cast_id} style={styles.castContainer}>
            <FadeIn placeholderStyle={{backgroundColor: '#000'}}>
              <Image source={{ uri: `${TMDB_IMG_URL}/w185/${item.profile_path}` }} style={styles.castImage} />
            </FadeIn>
            <View style={styles.characterContainer}>
              <Text style={styles.characterName}>
                {item.name}
              </Text>
              <Text style={styles.asCharacter}>
                {item.character && `as ${item.character}`}
              </Text>
            </View>
          </View>
        ))
      }
    </View>
  );
};

Casts.propTypes = {
  info: PropTypes.object.isRequired,
  getTabHeight: PropTypes.func.isRequired
};

export default Casts;
