import { Platform } from 'react-native'
import { Camera } from 'expo-camera'

export const requestCamera= async () => {
  if (Platform.OS === 'web')
    return await Camera.isAvailableAsync();

  const { status } = await Camera.requestPermissionsAsync();
  return status === 'granted';
}

export const takePhoto = async (camera: Camera): Promise<string> => {
  const photo = await camera.takePictureAsync({
    quality: 0,
    base64: true,
  });

  return photo.uri || 'data:image/jpg;base64,' + photo.base64;
}
