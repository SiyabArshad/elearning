import { LogBox } from 'react-native';
import React,{useState} from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getAuth, signOut,updateProfile } from "firebase/auth";
import LoadingModal from '../components/common/LoadingModal';
import app from '../../firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref,getDownloadURL,getStorage, uploadBytes  } from "firebase/storage"
//components
import Screen from './../components/Screen';
import BottomTab from '../components/common/BottomTab';
//config
import Colors from '../config/Colors';

function ProfileScreen(props) {
    const storage=getStorage(app)
    const auth = getAuth(app);
    const [indicator, showIndicator] = useState(false);
    const data = [
        {
            viewColor: '#F0DDDD',
            iconSource: require('../../assets/images/1.png'),
            title: 'Upload',
        },
        
        {
            viewColor: '#E2D7F9',
            iconSource: require('../../assets/images/3.png'),
            title: 'Logout',
        },
        {
            viewColor: '#C4C4C4',
            iconSource: require('../../assets/images/5.png'),
            title: 'Help',
        }
    ]
    const pickImage = async () => {
        // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    if (!result.cancelled) {
    //  uploadimage(result.uri,auth.currentUser.displayName + "profilepic"+new Date().toLocaleString())
    showIndicator(true)  
    const storageRef = ref(storage, 'users/' + auth.currentUser.displayName + "profilepic"+new Date().toLocaleString());
    const img = await fetch(result.uri);
    const bytes = await img.blob();
    uploadBytes(storageRef, bytes)
    .then(snapshot => {
      return getDownloadURL(snapshot.ref)
      showIndicator(false)
    })
    .then(downloadURL => {
        updateProfile(auth.currentUser,{photoURL:downloadURL})
      setTimeout(() => {
        props.navigation.navigate("ProfileScreen")
        showIndicator(false)
      }, 1000);
    })
    
}
      };

const settingfunc=(settingname)=>{
if(settingname==="Logout")
{
    signOut(auth).then(() => {
    alert("logged out")
      }).catch((error) => {
        alert("Logout failed")
        // An error happened.
      });
}
if(settingname==="Upload")
{
    pickImage()
}
if(settingname==="Help")
{
    props.navigation.navigate("ChatScreen")
}
}
LogBox.ignoreLogs(['Setting a timer']);
    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center", backgroundColor: Colors.white }}>
            <LoadingModal show={indicator}></LoadingModal>
            {/* Nav */}
            <View style={{ width: '100%', height: RFPercentage(40), backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center' }} >
                <TouchableOpacity  activeOpacity={0.8} style={{ position: 'absolute', left: RFPercentage(3), top: RFPercentage(5) }} >
                    <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.white} />
                </TouchableOpacity>

                <Text style={{ marginTop: RFPercentage(-14), color: Colors.white, fontSize: RFPercentage(3.5), fontWeight: 'bold' }} >
                {auth.currentUser.displayName}
                </Text>
                <Text style={{ color: Colors.white, fontSize: RFPercentage(1.8) }} >
                    Student
                </Text>

                <View style={{ width: '100%', height: RFPercentage(10), position: 'absolute', bottom: 0, backgroundColor: Colors.white, borderTopLeftRadius: RFPercentage(7), borderTopRightRadius: RFPercentage(7) }} />
            </View>

            <TouchableOpacity activeOpacity={1}  onPress={()=>pickImage()}>
                <Image style={{ marginTop: RFPercentage(-18), width: RFPercentage(16), height: RFPercentage(16),borderRadius:RFPercentage(8) }} source={{uri:auth.currentUser.photoURL}} />
            </TouchableOpacity>
            <ScrollView style={{ flex: 1, width: '100%' }} >
                <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                    {data.map((item, i) => (

                        <View key={i} style={{ marginTop: i == 0 ? RFPercentage(4) : RFPercentage(4), width: '90%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                            <View style={{ backgroundColor: item.viewColor, width: RFPercentage(7.5), height: RFPercentage(7.5), borderRadius: RFPercentage(2), justifyContent: 'center', alignItems: 'center' }} >
                                <Image style={{ width: RFPercentage(3), height: RFPercentage(3) }} source={item.iconSource} />
                            </View>
                            <TouchableOpacity onPress={()=>settingfunc(item.title)}>
                            <Text style={{ marginLeft: RFPercentage(2.8), color: Colors.black, fontSize: RFPercentage(2.3), fontWeight: '700' }} >
                                {item.title}
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', right: 0 }}  >
                                <MaterialIcons name="navigate-next" style={{ fontSize: RFPercentage(3.9) }} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                <View style={{ marginBottom: RFPercentage(14) }} />
            </ScrollView>

            {/* Bottom Tab */}
            <BottomTab props={props} />
        </Screen>
    );
}

export default ProfileScreen;