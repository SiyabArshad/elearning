import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LogBox } from 'react-native';
//components
import Screen from './../components/Screen';
import BottomTab from '../components/common/BottomTab';

//config
import Colors from '../config/Colors';

function LessonsScreen(props) {

    const data = [
        {
            title: 'Lesson 1',
            url:"https://youtu.be/EirtvpRZxhM"
        },
        {
            title: 'Lesson 2',
            url:"https://youtu.be/EirtvpRZxhM"
        },
        {
            title: 'Lesson 3',
            url:"https://youtu.be/EirtvpRZxhM"
        },
        {
            title: 'Lesson 4',
            url:"https://youtu.be/EirtvpRZxhM"
        },
        {
            title: 'Lesson 5',
            url:"https://youtu.be/EirtvpRZxhM"
        },
        {
            title: 'Lesson 6',
            url:"https://youtu.be/EirtvpRZxhM"
        },
        {
            title: 'Lesson 7',
            url:"https://youtu.be/EirtvpRZxhM"
        },
    ]
const switchvideo=(url)=>{
    props.navigation.navigate("VideoScreen",{vidurl:url})
}
LogBox.ignoreLogs(['Setting a timer']);
return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center", backgroundColor: Colors.white }}>

            {/* Nav */}
            <View style={{ width: '100%', height: RFPercentage(22), justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }} >
                <View style={{ marginTop: RFPercentage(-5.5), width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                    <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen")} activeOpacity={0.8} style={{ position: 'absolute', left: 0 }} >
                        <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(3.6), fontWeight: 'bold' }} >
                        Lessons
                    </Text>
                </View>

                <View style={{ width: '100%', height: RFPercentage(6), position: 'absolute', bottom: 0, backgroundColor: Colors.white, borderTopLeftRadius: RFPercentage(14), borderTopRightRadius: RFPercentage(14) }} />
            </View>

            <View style={{ bottom: RFPercentage(1), width: '90%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }} >
                <View style={{ width: RFPercentage(1), height: RFPercentage(1), borderRadius: RFPercentage(10), backgroundColor: Colors.primary }} />
                <Text style={{ marginLeft: RFPercentage(1), color: Colors.primary, fontSize: RFPercentage(2.6), fontWeight: 'bold' }} >
                    All Video
                </Text>
            </View>

            <ScrollView style={{ flex: 1, width: '100%' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    {data.map((item, i) => (

                        <TouchableOpacity onPress={()=>switchvideo(item.url)} activeOpacity={0.8} key={i} style={{ marginTop: i == 0 ? RFPercentage(7) : RFPercentage(4), width: RFPercentage(45), height: RFPercentage(14), backgroundColor: Colors.primary, borderRadius: RFPercentage(3), justifyContent: 'center', alignItems: 'center' }} >
                            <View style={{ width: '90%', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }} >
                                <View style={{ backgroundColor: Colors.white, width: RFPercentage(7.5), height: RFPercentage(7.5), borderRadius: RFPercentage(3), justifyContent: 'center', alignItems: 'center' }} >
                                    <Image style={{ width: RFPercentage(4), height: RFPercentage(4) }} source={require('../../assets/images/play.png')} />
                                </View>
                                <View style={{ marginLeft: RFPercentage(2), justifyContent: 'center', alignItems: 'flex-start' }} >
                                    <Text style={{ marginTop: RFPercentage(1), color: Colors.white, fontSize: RFPercentage(2) }} >
                                        {item.title}
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', marginTop: RFPercentage(0.5), color: Colors.white, fontSize: RFPercentage(2.6) }} >
                                        Understanding
                                    </Text>
                                    <View style={{ marginTop: RFPercentage(2), width: '100%', backgroundColor: Colors.darkGrey, height: RFPercentage(0.2), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                                        <View style={{ width: '70%', height: RFPercentage(0.2), backgroundColor: Colors.white }} />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
                <View style={{ marginBottom: RFPercentage(10) }} />
            </ScrollView>

            {/* Bottom tab */}
            <BottomTab props={props} />
        </Screen>
    );
}

export default LessonsScreen;