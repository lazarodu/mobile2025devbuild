import { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles'
import { ComponentButtonInterface } from '../../components';
export function ImagemScreen() {
  const [albums, setAlbums] = useState<MediaLibrary.Album[] | null>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [image, setImage] = useState<string | null>(null);
  async function getAlbums() {
    if (permissionResponse &&
      permissionResponse.status !== 'granted' &&
      permissionResponse.accessPrivileges !== 'all'
    ) {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  return (
    <>
      <ComponentButtonInterface onPress={pickImage} title='Abrir Imagem' type='secondary' />
      <View style={styles.containerImage}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </>
  );
}


