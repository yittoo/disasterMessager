import {PermissionsAndroid, ToastAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export default async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location',
        message:
          "This app would like to view your coordinates in order to prepare emergency message's coordinates",
        buttonPositive: 'Allow',
        buttonNegative: 'Block',
      },
    );
    if (granted === 'granted') {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          res => {
            resolve(
              `\nCoords - ltd: ${res.coords.latitude}, lng: ${res.coords.longitude}`,
            );
          },
          err => {
            console.log(err);
            reject('');
          },
          {
            timeout: 30000,
            maximumAge: 60000,
            enableHighAccuracy: true,
          },
        );
      });
    } else {
      ToastAndroid.showWithGravity(
        'You need to provide access to location services in order to append your location to the message',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
      return '';
    }
  } catch (err) {
    console.log(err);
    return '';
  }
};
