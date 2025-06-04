import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/utils/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password is too long'),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const [loading, setLoading] = useState(false);
  // const { onRegister } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: 'cory@test.com',
      password: '123456',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log({ data });
    // const result = await onRegister!(data.email, data.password, data.name);
    // if (result && result.error) {
    //   Alert.alert('Error', result.msg);
    // } else {
    //   router.back();
    // }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name (optional)"
              value={value}
              onChangeText={onChange}
              style={styles.inputField}
              placeholderTextColor={COLORS.placeholder}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>
        )}
      />

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
          Sign up
        </Text>
      </TouchableOpacity>

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
  inputContainer: {
    marginBottom: 12,
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: COLORS.input,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 4,
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

export default Register;
