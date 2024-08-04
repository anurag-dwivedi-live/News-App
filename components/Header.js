import React, { useEffect } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen
import {
  useFonts,
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';

// Prevent auto hiding of the splash screen
SplashScreen.preventAutoHideAsync();

export default function Header() {
  let [fontsLoaded] = useFonts({
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
  });
  
  // Hide splash screen when fonts are loaded
  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Return null while fonts are loading
  }

  return (
    <SafeAreaView>
      <StatusBar style='light' backgroundColor='black' animated />
      <View style={styles.headerBox}>
        <View style={styles.logoBox}>
          <Image
            source={require("../assets/icon.png")}
            style={styles.logo} resizeMode='cover'
          />
          <Text style={styles.logoText}>News</Text>
        </View>
        <View>
          <Pressable
            onPress={() => {
              Linking.openURL('https://github.com/anurag-dwivedi-live');
            }} style={styles.gitButton}
          >
            <AntDesign name="github" marginRight={2} size={24} color="black" />
            <AntDesign name="arrowright" size={18} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    marginTop: 50,
    marginBottom: 12,
    paddingHorizontal: 25,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "SourceSansPro_400Regular",
  },
  logoBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: undefined,
    aspectRatio: 1,
    marginRight: 10,
  },
  logoText: {
    fontSize: 22,
    fontFamily: "SourceSansPro_600SemiBold", // Use the loaded font
  },
  gitButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgrey",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
});
