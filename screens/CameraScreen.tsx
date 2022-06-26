import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'
import tw from 'tailwind-react-native-classnames'
import { Ionicons } from '@expo/vector-icons'
import { RALEWAY_BOLD } from '../constants/Colors'
import StartPost from '../components/StartPost'


let camera: Camera
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState<any>(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo: any = await camera.takePictureAsync()
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = async (file: string) => {
    // const resp = await uploadFileToBucket(file);
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }
  return (
    <View style={styles.container}>
      <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r;
                // start camera right away
                __startCamera()
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <View style={{
                      ...tw`h-12 w-12 p-1 bg-white text-black`,
                      borderRadius: 50,
                      shadowColor: 'black',
                      shadowRadius: 4,
                      shadowOpacity: 0.33,
                    }}>
                      <Ionicons
                        style={tw`mt-0.5 mx-1 h-8 w-8`}
                        name={
                          flashMode === 'off' ? 'flash-off' : 'flash'
                        } size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 40,
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    {
                      cameraType === 'front' ?
                      <View style={{
                        ...tw`h-12 w-12 p-1 bg-black text-white`,
                        borderRadius: 50,
                        shadowColor: 'black',
                        shadowRadius: 4,
                        shadowOpacity: 0.33,
                      }}>
                        <Ionicons
                          style={tw`mt-0.5 mx-1 h-8 w-8`}
                          name="camera-reverse-outline" size={30} color="white" />
                      </View>
                      :
                      <View style={{
                        ...tw`h-12 w-12 p-1 bg-white text-black`,
                        borderRadius: 50,
                      }}>
                        <Ionicons
                          style={tw`mt-0.5 mx-1 h-8 w-8`}
                          name="camera-reverse-outline" size={30} color="black" />
                      </View>
                    }
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      {/* {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r;
                // start camera right away
                __startCamera()
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <View style={{
                      ...tw`h-12 w-12 p-1 bg-white text-black`,
                      borderRadius: 50,
                      shadowColor: 'black',
                      shadowRadius: 4,
                      shadowOpacity: 0.33,
                    }}>
                      <Ionicons
                        style={tw`mt-0.5 mx-1 h-8 w-8`}
                        name={
                          flashMode === 'off' ? 'flash-off' : 'flash'
                        } size={30} color="black" />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 40,
                      borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    {
                      cameraType === 'front' ?
                      <View style={{
                        ...tw`h-12 w-12 p-1 bg-black text-white`,
                        borderRadius: 50,
                        shadowColor: 'black',
                        shadowRadius: 4,
                        shadowOpacity: 0.33,
                      }}>
                        <Ionicons
                          style={tw`mt-0.5 mx-1 h-8 w-8`}
                          name="camera-reverse-outline" size={30} color="white" />
                      </View>
                      :
                      <View style={{
                        ...tw`h-12 w-12 p-1 bg-white text-black`,
                        borderRadius: 50,
                      }}>
                        <Ionicons
                          style={tw`mt-0.5 mx-1 h-8 w-8`}
                          name="camera-reverse-outline" size={30} color="black" />
                      </View>
                    }
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <StartPost startCamera={__startCamera} />
      )} */}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({photo, retakePicture, savePhoto}: any) => {
  /*
  photo:
   {
    "height": 4224,
    "uri": "file:///var/mobile/Containers/Data/Application/FD5F7ABC-767E-4F96-8FBC-169FFF472410/Library/Caches/ExponentExperienceData/%2540anonymous%252FfreeganMapApp-154c0145-823b-47aa-887c-d8503e2aabf5/Camera/4180AC9C-7686-4E8F-A943-6FD72DDBB1DC.jpg",
    "width": 2154,
  }
  */
 console.log('photo', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            ...tw`pt-2 pb-4 absolute -bottom-4 left-0 right-0`,
            backgroundColor: 'rgba(255,255,255,0.65)',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              ...tw`bg-transparent w-full`
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                alignItems: 'center',
                borderRadius: 4,
                ...tw`bg-transparent`
              }}
            >
              <View style={{
                ...tw`bg-transparent py-1 px-2`,
                borderRadius: 5,
              }}>
                <Text
                  style={{
                    ...tw`bg-transparent py-3 px-2 text-black text-base`,
                    fontFamily: RALEWAY_BOLD,
                  }}
                >
                  Retake
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 160,
                alignItems: 'center',
                borderRadius: 4,
                ...tw`bg-transparent`
              }}
            >
              <View style={{
                ...tw`py-1 px-2 bg-transparent`,
                borderRadius: 5,
              }}>
                <Text
                  style={{
                    ...tw`bg-transparent flex flex-row py-3 px-2 text-black text-base`,
                    fontFamily: RALEWAY_BOLD,
                  }}
                >
                  Save Photo
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}