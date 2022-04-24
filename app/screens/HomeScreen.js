import React,{useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { MaterialIcons } from '@expo/vector-icons';
import BottomTab from '../components/common/BottomTab'
import app from '../../firebase';
import { getAuth} from 'firebase/auth';
import { LogBox } from 'react-native';
import LoadingModal from "../components/common/LoadingModal"
//components
import Screen from './../components/Screen';

//config
import Colors from '../config/Colors';

function HomeScreen(props) {
    const auth=getAuth(app)
    const[indicator,showindicator]=useState(false)
    const refresher=()=>{
        showindicator(true)
        setTimeout(() => {
            showindicator(false)
        }, 2000);
    }
    useEffect(()=>{
        refresher()
        const abortcontroller=new AbortController()
        return abortcontroller.abort()
    },[])
    LogBox.ignoreLogs(['Setting a timer']);
    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center", backgroundColor: Colors.white }}>
<LoadingModal show={indicator}></LoadingModal>
            {/* Nav */}
            <ImageBackground style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: RFPercentage(32) }} source={require('../../assets/images/nav.png')} >
                <View style={{ width: '100%', height: RFPercentage(10), position: 'absolute', bottom: 0, backgroundColor: Colors.white, borderTopLeftRadius: RFPercentage(7), borderTopRightRadius: RFPercentage(7) }} />
                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', width: '90%', marginTop: RFPercentage(-9) }} >
                    <Text style={{ color: Colors.primary, fontSize: RFPercentage(3.2), fontWeight: '700' }} >
                        Hello!
                    </Text>
                    <Text style={{ color: Colors.primary, fontSize: RFPercentage(3.2), fontWeight: '700' }} >
                        {auth.currentUser.displayName}
                    </Text>
                </View>
            </ImageBackground>

            <ScrollView style={{ flex: 1, width: '100%' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }} >
                        <TouchableOpacity onPress={() => props.navigation.navigate("TranslationScreen")} activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center', width: RFPercentage(18), height: RFPercentage(13), borderRadius: RFPercentage(3.5), backgroundColor: Colors.primary }} >
                            <Image style={{ width: RFPercentage(4.2), height: RFPercentage(4.2) }} source={require('../../assets/images/trans.png')} />
                            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.8), marginTop: RFPercentage(1) }} >
                                Translate
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: RFPercentage(7), width: RFPercentage(45), height: RFPercentage(15), backgroundColor: Colors.primary, borderRadius: RFPercentage(3), justifyContent: 'center', alignItems: 'center' }} >
                        <TouchableOpacity activeOpacity={0.8} onPress={() => props.navigation.navigate("LessonsScreen")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '90%' }} >
                            <Text style={{ color: Colors.white, fontSize: RFPercentage(3) }} >
                                Lessons
                            </Text>
                            <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', right: 0 }}  >
                                <MaterialIcons name="navigate-next" style={{ fontSize: RFPercentage(3.5) }} color={Colors.white} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: RFPercentage(7), width: RFPercentage(45), height: RFPercentage(15), backgroundColor: Colors.primary, borderRadius: RFPercentage(3), justifyContent: 'flex-start', alignItems: 'center' }} >
                        <View style={{ marginTop: RFPercentage(2.2), justifyContent: 'center', alignItems: 'center', width: '90%' }} >
                            <Text style={{ color: Colors.white, fontSize: RFPercentage(2.5), fontWeight: '600', textDecorationLine: 'underline' }} >
                                Quote of the day
                            </Text>
                            <Text style={{ color: Colors.white, fontSize: RFPercentage(1.8), marginTop: RFPercentage(2.3), textAlign: 'center' }} >
                                “No matter how bad or slow things go, you're still way ahead of everyone who isn't even trying.”
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={{ marginBottom: RFPercentage(15) }} />
            </ScrollView>

            {/* Bottom Tab */}
            <BottomTab props={props} />

        </Screen>
    );
}

export default HomeScreen;