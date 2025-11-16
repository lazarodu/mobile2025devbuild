import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Alert, Platform } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { LoginTypes } from '../../navigations/LoginStackNavigation';
import { ComponentButtonInterface, ComponentLoading } from '../../components';
import { makeUserUseCases } from '../../core/factories/makeUserUseCases';

export function RegisterScreen({ navigation }: LoginTypes) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userUseCases = makeUserUseCases();

  async function handleRegister() {
    setLoading(true);
    setError(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      await userUseCases.registerUser.execute({
        name,
        email,
        password,
        latitude,
        longitude,
      });
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err)
      setError('Failed to register user');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Text style={styles.title}>Cadastre-se</Text>
        <View style={styles.formRow}>
          <Ionicons name="person" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Nome"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.formRow}>
          <MaterialIcons name="email" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.formRow}>
          <Entypo name="key" style={styles.icon} />
          <TextInput
            placeholderTextColor={colors.third}
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        {loading ? (
          <ComponentLoading />
        ) : (
          <ComponentButtonInterface title='Salvar' type='secondary' onPress={handleRegister} disabled={loading} />
        )}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <ComponentButtonInterface title='Voltar' type='primary' onPress={() => navigation.navigate('Login')} />
      </KeyboardAvoidingView>
    </View>
  );
}
