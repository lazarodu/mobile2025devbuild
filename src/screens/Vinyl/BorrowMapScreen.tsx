import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import { useAuth } from '../../context/auth';
import { makeUserUseCases } from '../../core/factories/makeUserUseCases';
import { User } from '../../core/domain/entities/User';
import { VinylRecord } from '../../core/domain/entities/VinylRecord';
import { colors } from '../../styles/colors';
import { ComponentButtonInterface, ComponentLoading } from '../../components';
import { makeLoanUseCases } from '../../core/factories/makeLoanUseCases';

export function BorrowMapScreen() {
  const [owner, setOwner] = useState<User | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const { user: borrower } = useAuth();
  const route = useRoute();
  const { record } = route.params as { record: VinylRecord };
  const mapRef = useRef<MapView>(null);
  const userUseCases = makeUserUseCases();
  const loanUseCases = makeLoanUseCases();
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchOwner() {
      if (record.ownerId) {
        const ownerData = await userUseCases.findUser.execute({ id: record.ownerId });
        setOwner(ownerData);
      }
    }
    fetchOwner();
  }, [record.ownerId]);

  useEffect(() => {
    if (owner && borrower) {
      // Calculate the center point and deltas for the region
      const midLat = (owner.location.latitude + borrower.location.latitude) / 2;
      const midLng = (owner.location.longitude + borrower.location.longitude) / 2;
      const latDelta = Math.abs(owner.location.latitude - borrower.location.latitude) * 1.5;
      const lngDelta = Math.abs(owner.location.longitude - borrower.location.longitude) * 1.5;

      setRegion({
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
      });
    }
  }, [owner, borrower]);

  async function handleBorrow() {
    if (!borrower) {
      Alert.alert('Error', 'Você precisa fazer login para pedir um vinil emprestado.');
      return;
    }

    try {
      await loanUseCases.borrowVinylRecord.execute({
        userId: borrower.id,
        vinylRecordId: record.id,
      });
      Alert.alert('Success', 'Solicitação de empréstimo realizada!');
      navigation.goBack(); // Navigate back after successful borrow
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Falha ao solicitar o empréstimo.');
    }
  }

  if (!owner || !borrower || !region) {
    return <ComponentLoading />;
  }

  const ownerCoords = {
    latitude: owner.location.latitude,
    longitude: owner.location.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta,
  };

  const borrowerCoords = {
    latitude: borrower.location.latitude,
    longitude: borrower.location.longitude,
    latitudeDelta: region.latitudeDelta,
    longitudeDelta: region.longitudeDelta,
  };
  console.log(borrowerCoords, ownerCoords, region, 'a')
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region} ref={mapRef}>
        <Marker coordinate={ownerCoords} title={owner.name.value} description="Dono do Vinil" />
        <Marker coordinate={borrowerCoords} title={borrower.name.value} description="Você" />
        <MapViewDirections
          origin={borrowerCoords}
          destination={ownerCoords}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_PLACES!}
          strokeColor={colors.primary}
          strokeWidth={4}
          onReady={result => {
            mapRef.current?.fitToCoordinates(result.coordinates, {
              edgePadding: {
                top: 50,
                right: 50,
                bottom: 50,
                left: 50,
              },
            });
          }}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <ComponentButtonInterface title="Pedir" type="primary" onPress={handleBorrow} />
        <ComponentButtonInterface title="Voltar" type="secondary" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
