import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Page = () => {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://galaxies.dev/privacy' }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Page;
