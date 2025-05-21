import type {FC} from 'react';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';

const ProfilePage: FC = () => {
    const data = Array.from(Array(100).keys());

    const HeaderNavBar = () => {
        return (
            <View>
                <Text style={{color: '#fff'}}>aaaa</Text>
            </View>
        );
    };

    const TopNavBar = () => {
        return (
            <View>
                <Text style={{color: '#fff'}}>BBBB</Text>
            </View>
        );
    };

    return (
        // <View>
        //     <Text>aa</Text>
        // </View>
        <SafeAreaView style={styles.container}>
            <AnimatedScrollView
                HeaderNavbarComponent={<HeaderNavBar />}
                TopNavBarComponent={<TopNavBar />}
                headerImage={require('@/assets/images/cabin.jpg')}
            >
                {data.map((e) => {
                    return <View key={e}>
                        <Text>{e}</Text>
                    </View>;
                })}
            </AnimatedScrollView>
        </SafeAreaView>
        // <AnimatedScrollView
        //     // HeaderNavbarComponent={HeaderNavBar()}
        //     // TopNavBarComponent={<TopNavBar />}
        //     headerImage={require('@/assets/images/cabin.jpg')}
        // >
        //     {data.map((e) => {
        //         return <View key={e}>
        //             <Text>{e}</Text>
        //         </View>;
        //     })}
        // </AnimatedScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFC',
    },
});

export default ProfilePage;
