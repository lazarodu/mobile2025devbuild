import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, Platform, Alert } from 'react-native';

import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { ComponentButtonInterface, ComponentLoading } from '../../components';
import { LoginTypes } from '../../navigations/LoginStackNavigation';
import { useAuth } from '../../context/auth';

export function LoginScreen({ navigation }: LoginTypes) {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login() {
    setLoading(true);
    setError(null);
    try {
      await handleLogin({ email, password });
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <Text style={styles.title}>Login</Text>
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
          <ComponentButtonInterface title='Login' type='primary' onPress={login} disabled={loading} testID="login-button" />
        )}
        {error && <Text style={{ color: 'red' }}>{error}</Text>}
        <ComponentButtonInterface title='Cadastre-se' type='secondary' onPress={() => navigation.navigate("Register")} />
      </KeyboardAvoidingView>
    </View>
  );
}
