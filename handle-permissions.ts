// @ts-nocheck
import Geolocation, { requestAuthorization } from 'react-native-geolocation-service';

export const requestPermissionLocation = () => {
  return requestAuthorization('always');
}

export const getPermittedLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (location) => resolve(location),
      (err) => reject(err),
      {
        timeout: 5000,
        maximumAge: 10000,
        enableHighAccuracy: true,
      }
    );
  })
  // return new Promise((resolve, reject) => {
  //   RNLocation.configure({
  //     distanceFilter: 5, // Meters
  //     // desiredAccuracy: {
  //     //   ios: "best",
  //     //   android: "balancedPowerAccuracy"
  //     // },
  //     // // Android only
  //     // androidProvider: "auto",
  //     // interval: 5000, // Milliseconds
  //     // fastestInterval: 10000, // Milliseconds
  //     // maxWaitTime: 5000, // Milliseconds
  //     // // iOS Only
  //     // activityType: "other",
  //     // allowsBackgroundLocationUpdates: false,
  //     // headingFilter: 1, // Degrees
  //     // headingOrientation: "portrait",
  //     // pausesLocationUpdatesAutomatically: false,
  //     // showsBackgroundLocationIndicator: false,
  //   })

  //   RNLocation.getLatestLocation({ timeout: 60000 })
  //     .then(latestLocation => {
  //       // Use the location here
  //       resolve(latestLocation);
  //     })
     
  //   // RNLocation.requestPermission({
  //   //   ios: "whenInUse",
  //   //   android: {
  //   //     detail: "fine"
  //   //   }
  //   // }).then(granted => {
  //   //     if (granted) {
  //   //       // this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
  //   //       //   /* Example location returned
  //   //       //   {
  //   //       //     speed: -1,
  //   //       //     longitude: -0.1337,
  //   //       //     latitude: 51.50998,
  //   //       //     accuracy: 5,
  //   //       //     heading: -1,
  //   //       //     altitude: 0,
  //   //       //     altitudeAccuracy: -1
  //   //       //     floor: 0
  //   //       //     timestamp: 1446007304457.029,
  //   //       //     fromMockProvider: false
  //   //       //   }
  //   //       //   */
  //   //       // })
  //   //       RNLocation.getLatestLocation({ timeout: 60000 })
  //   //         .then(latestLocation => {
  //   //           // Use the location here
  //   //           resolve(latestLocation);
  //   //         })
  //   //     }
  //   //   })
  //   //   .catch(err => {
  //   //     reject(err);
  //   //   })
  // })
}