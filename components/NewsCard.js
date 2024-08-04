import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, Pressable, Share } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';
import { parseISO, differenceInHours } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
    useFonts,
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';

// Prevent auto hiding of the splash screen
SplashScreen.preventAutoHideAsync();

const sliceStr = (inputString) => {
    const words = inputString.split(/\s+/);
    const slicedWords = words.slice(0, 10);
    let result = slicedWords.join(' ');
    if (words.length > 99) {
        result += '...';
    }
    return result;
};

const formatRelativeTime = (dateString) => {
    const date = parseISO(dateString);
    const now = new Date();
    const hoursDiff = differenceInHours(now, date);

    if (hoursDiff < 24) {
        if (hoursDiff < 1) {
            return 'Just now';
        }
        return `${hoursDiff} hour${hoursDiff > 1 ? 's' : ''} ago`;
    }

    const daysDiff = Math.floor(hoursDiff / 24);
    return `${daysDiff} day${daysDiff > 1 ? 's' : ''} ago`;
};

const handleShare = async (title, url) => {
    try {
        await Share.share({
            message: `${title}\n\nRead more: ${url}`,
        });
    } catch (error) {
        console.log('Error sharing:', error.message);
    }
};

export default function NewsCard(props) {
    let [fontsLoaded] = useFonts({
        SourceSansPro_300Light,
        SourceSansPro_400Regular,
        SourceSansPro_600SemiBold,
        SourceSansPro_700Bold,
    });
    
    const [imageLoaded, setImageLoaded] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const hideSplashScreen = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
            }
        };
        hideSplashScreen();
    }, [fontsLoaded]);

    const goToDetails = () => {
        navigation.navigate('NewsDetails', {
            title: props.title,
            author: props.author,
            source: props.source,
            publishedAt: props.publishedAt,
            imageUrl: props.imageUrl,
            url: props.url,
            content: props.content,
            description: props.description,
        });
    };

    const slicedTitle = sliceStr(props.title);
    const relativeTime = formatRelativeTime(props.publishedAt);
    
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const imageUrl = props.imageUrl || 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';

    if (!fontsLoaded) {
        return null; // Return null while fonts are loading
    }

    return (
        <Pressable onPress={goToDetails}>
            <View style={styles.cardBox}>
                <View style={styles.imageContainer}>
                    {!imageLoaded && (
                        <ShimmerPlaceholder
                            style={styles.cardImg}
                            LinearGradient={LinearGradient}
                            duration={900}
                        />
                    )}
                    <Image
                        source={{ uri: imageUrl }}
                        style={[styles.cardImg, { display: imageLoaded ? 'flex' : 'none' }]}
                        onLoad={handleImageLoad}
                    />
                </View>
                <Text style={styles.newsDesc}>{slicedTitle}</Text>
                <View style={styles.btBox}>
                    <Text>{props.author} • {relativeTime}</Text>
                    <Pressable onPress={() => handleShare(slicedTitle, props.url)}>
                        <AntDesign name="sharealt" size={18} color="black" />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardBox: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        borderColor: "gray",
        padding: 18,
        paddingTop: 12,
    },
    cardImg: {
        width: "100%",
        height: undefined,
        aspectRatio: 1.78,
        borderRadius: 15,
    },
    newsDesc: {
        marginTop: 10,
        fontSize: 22,
        fontFamily: "SourceSansPro_600SemiBold",
        lineHeight: 26,
    },
    btBox: {
        fontFamily: "SourceSansPro_300Light",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 12,
        marginTop: 4,
    }
});
