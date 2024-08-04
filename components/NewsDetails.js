import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Linking } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen
import { useFonts, SourceSansPro_300Light, SourceSansPro_400Regular, SourceSansPro_600SemiBold, SourceSansPro_700Bold } from '@expo-google-fonts/source-sans-pro';

// Prevent auto hiding of the splash screen
SplashScreen.preventAutoHideAsync();

export default function NewsDetails({ route }) {
    // Use hooks at the top level
    let [fontsLoaded] = useFonts({
        SourceSansPro_300Light,
        SourceSansPro_400Regular,
        SourceSansPro_600SemiBold,
        SourceSansPro_700Bold,
    });
    const [imageLoaded, setImageLoaded] = useState(false);

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

    const {
        title,
        author,
        source,
        publishedAt,
        imageUrl,
        url,
        content,
        description
    } = route.params;

    return (
        <View>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <ShimmerPlaceHolder
                    visible={imageLoaded}
                    LinearGradient={LinearGradient}
                >
                    <Image
                        source={{ uri: imageUrl || "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png" }}
                        style={styles.image}
                        onLoadEnd={() => setImageLoaded(true)}
                    />
                </ShimmerPlaceHolder>
                <View>
                    <Text style={styles.lgBold1}>Summary</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                <View>
                    <Text style={styles.lgBold2}>Full Article</Text>
                    <Text style={styles.content}>{content}</Text>
                </View>
                <View style={styles.authorInfo}>
                    <Text style={styles.smBold}>Author :</Text>
                    <Text style={styles.source}>{author}</Text>
                </View>
                <View style={styles.authorInfo}>
                    <Text style={styles.smBold}>Published At :</Text>
                    <Text style={styles.date}>{new Date(publishedAt).toLocaleString()}</Text>
                </View>
                <Pressable
                    style={styles.button}
                    onPress={() => Linking.openURL(url)}
                >
                    <Text style={styles.buttonText}>Read Full Article</Text>
                    <AntDesign name="arrowright" size={18} marginLeft={6} color="white" />
                </Pressable>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        marginLeft: 4,
        fontSize: 24,
        fontFamily: "SourceSansPro_600SemiBold",
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.78,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        marginBottom: 18,
        fontFamily: "SourceSansPro_400Regular",
    },
    authorInfo: {
        display: "flex",
        flexDirection: "row",
    },
    description: {
        fontSize: 17,
        marginBottom: 10,
        fontFamily: "SourceSansPro_600SemiBold",
    },
    lgBold1: {
        fontSize: 17,
        marginBottom: 4,
        color: "gray",
        textAlign: "center",
        fontFamily: "SourceSansPro_600SemiBold",
    },
    lgBold2: {
        fontSize: 16,
        marginTop: 8,
        marginBottom: 6,
        color: "gray",
        textAlign: "center",
        fontFamily: "SourceSansPro_600SemiBold",
    },
    source: {
        fontSize: 14,
        fontFamily: "SourceSansPro_400Regular",
    },
    date: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: "SourceSansPro_400Regular",
    },
    smBold: {
        marginRight: 6,
        fontFamily: "SourceSansPro_600SemiBold",
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
        display: "flex",
        flexDirection: "row",
        paddingVertical: 13,
        justifyContent: "center",
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontFamily: "SourceSansPro_600SemiBold",
    },
});
