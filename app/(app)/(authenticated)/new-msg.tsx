import { createMessage } from '@/utils/api';
import { COLORS } from '@/utils/colors';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as Burnt from 'burnt';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const NewMessagePage = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async () => {
      return createMessage({ content: message });
    },
    onSuccess: () => {
      // Invalidate messages query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      Burnt.toast({
        title: 'Message sent successfully',
        duration: 3,
      });
      router.back();
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
      Burnt.alert({
        title: 'Failed to send message',
        message: error.message,
        duration: 3,
      });
    },
  });

  const handleSend = () => {
    if (message.trim().length === 0 || isPending) return;
    sendMessage();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          multiline
          autoFocus
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !message.trim() && styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!message.trim() || isPending}
        >
          {isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewMessagePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    padding: 16,
    gap: 10,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    fontSize: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#a9a9a9',
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
