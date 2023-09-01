import { StyleSheet, Text, TextInput, View } from 'react-native';
import { MMKV } from 'react-native-mmkv' 

const storage = new MMKV();



export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <TextInput onChangeText={(text:any) => storage.set('name',text)} />
      <Text style={styles.title}>{storage.getString('name')}</Text>
      <View style={styles.separator}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
