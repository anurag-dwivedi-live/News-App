import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';  // Import SplashScreen
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import NewsCard from '../components/NewsCard';
import { API_KEY } from '@env';
import {
    useFonts,
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';

// Prevent auto hiding of the splash screen
SplashScreen.preventAutoHideAsync();

const getDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getNews = async () => {
    const data = await fetch(`https://newsapi.org/v2/everything?q=apple&from=${getDate()}&to=${getDate()}&sortBy=popularity&pageSize=20&apiKey=${API_KEY}`);
    const filtereddata = await data.json();
    return filtereddata;
};

const filterArticles = (articles) => {
    return articles.filter(article => article.title && article.title.length > 15);
};

export default function Headlines() {
    let [fontsLoaded] = useFonts({
        SourceSansPro_300Light,
        SourceSansPro_400Regular,
        SourceSansPro_600SemiBold,
        SourceSansPro_700Bold,
    });

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getNews();
                setData(result.articles);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const hideSplashScreen = async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync(); // Hide splash screen when fonts are loaded
            }
        };
        hideSplashScreen();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null; // Return null while fonts are loading
    }

    if (error) return <Text>Error: {error.message}</Text>;
    const filteredArticles = data.length > 0 ? filterArticles(data) : [];

    return (
        <ScrollView>
            <View style={styles.hdBox}>
                <AntDesign name="earth" size={18} color="black" />
                <Text style={styles.newsHd}>Today's Headlines</Text>
            </View>

            {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                    <View key={index} style={styles.cardBox}>
                        <ShimmerPlaceholder
                            style={styles.cardImg}
                            LinearGradient={LinearGradient}
                            shimmerStyle={styles.shimmerStyle}
                            duration={900}
                        />
                        <ShimmerPlaceholder
                            style={styles.newsDesc}
                            LinearGradient={LinearGradient}
                            shimmerStyle={styles.shimmerStyle}
                            duration={900}
                        />
                        <ShimmerPlaceholder
                            style={styles.btBox}
                            LinearGradient={LinearGradient}
                            shimmerStyle={styles.shimmerStyle}
                            duration={900}
                        />
                    </View>
                ))
            ) : (
                filteredArticles.map((article, index) => (
                    <NewsCard
                        key={index}
                        title={article.title}
                        author={article.author}
                        source={article.source.name}
                        publishedAt={article.publishedAt}
                        imageUrl={article.urlToImage}
                        description={article.description}
                        content={article.content}
                        url={article.url}
                    />
                ))
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    hdBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 18,
    },
    newsHd: {
        marginLeft: 4,
        fontSize: 22,
        fontFamily: "SourceSansPro_600SemiBold",
    },
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
        marginBottom: 10,
    },
    newsDesc: {
        width: "100%",
        height: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    btBox: {
        width: "100%",
        height: 20,
        borderRadius: 10,
    },
    shimmerStyle: {
        borderRadius: 10,
    }
});
