import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/utils/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  // const { onLogin } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'simon@galaxies.dev',
      password: 'Test123',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    // const result = await onLogin!(data.email, data.password);
    // if (result && result.error) {
    //   Alert.alert('Error', result.msg);
    // }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }}
        style={styles.image}
      />
      <Text style={styles.header}>Galaxies</Text>
      <Text style={styles.subheader}>The app to be.</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              autoCapitalize="none"
              placeholder="john@doe.com"
              value={value}
              onChangeText={onChange}
              style={styles.inputField}
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="password"
              value={value}
              onChangeText={onChange}
              secureTextEntry
              style={styles.inputField}
              placeholderTextColor={COLORS.placeholder}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={[
          styles.button,
          !errors.email && !errors.password ? {} : styles.buttonDisabled,
        ]}
        disabled={!!errors.email || !!errors.password}
      >
        <Text
          style={[
            styles.buttonText,
            !errors.email && !errors.password ? {} : styles.buttonTextDisabled,
          ]}
        >
          Sign in
        </Text>
      </TouchableOpacity>

      <Link href={'/register'} asChild>
        <TouchableOpacity style={styles.outlineButton}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </Link>

      <Link href={'/privacy'} asChild>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text style={{ color: COLORS.primary }}>Privacy Policy</Text>
        </TouchableOpacity>
      </Link>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
    color: '#fff',
  },
  subheader: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#fff',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: COLORS.input,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 4,
  },
  outlineButton: {
    marginVertical: 8,
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inputContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
    justifyContent: 'center',
  },
});

export default Login;
