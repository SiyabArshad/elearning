import React, { useState,useEffect,useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { LogBox } from 'react-native';
import { getAuth, updateProfile,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
//components
import Screen from './../components/Screen';
import LoadingModal from './../components/common/LoadingModal';
import MyAppButton from './../components/common/MyAppButton';
import InputField from './../components/common/InputField';
import app from '../../firebase';
//config
import Colors from '../config/Colors';

function SignupScreen(props) {
    const auth = getAuth(app);
    const [indicator, showIndicator] = useState(false);
    const [inputField, SetInputField] = useState([
        {
            placeholder: "Name",
            iconName: 'account-circle',
            value: "",
        },
        {
            placeholder: "Email",
            iconName: 'mail',
            value: ""
        },
        {
            placeholder: "Password",
            iconName: 'lock',
            value: "",
            secure: true
        },
        {
            placeholder: "Confirm Password",
            iconName: 'lock',
            value: "",
            secure: true
        },
    ]);
    const handleChange = (text, i) => {
        let tempfeilds = [...inputField];
        tempfeilds[i].value = text;
        SetInputField(tempfeilds);

    };
    
    const handleLogin = () => {      
        showIndicator(true);
        let tempfeilds = [...inputField];
        if (tempfeilds[0].value === "" || tempfeilds[1].value === "" || tempfeilds[2].value === "" || tempfeilds[3].value === "") {
            alert("Please fill all the feilds");
            showIndicator(false);
            return true;
        }
        if (tempfeilds[2].value !== tempfeilds[3].value) {
            alert("Confirm Password not Match Actual Password");
            showIndicator(false);
            return true;
        }


        try {
            // API INTEGRATION WILL COME HERE
            createUserWithEmailAndPassword(auth,tempfeilds[1].value,tempfeilds[2].value).then((userCredential) => {
                      signInWithEmailAndPassword(auth, userCredential._tokenResponse.email, tempfeilds[2].value)
                      .then((userCredential) => {
                        updateProfile(auth.currentUser,{displayName:tempfeilds[0].value,photoURL:""}) 
                        showIndicator(false);      
                          }).catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            showIndicator(false);
                            alert(errorMessage)
                            // ..
                          });
                  }).catch(()=>{
                    showIndicator(false);
                    alert("Signup Failed")
                })

        } catch (error) {
            showIndicator(false);
            alert("Error");
        }
    };
    useEffect(()=>{
        const abortcontroller=new AbortController()
        return abortcontroller.abort()
    },[])
    LogBox.ignoreLogs(['Setting a timer']);
    return (
        <Screen style={{ flex: 1, justifyContent: 'flex-start', alignItems: "center", backgroundColor: Colors.white }}>
            <LoadingModal show={indicator} />
            {/* Nav */}
            <View style={{ width: '100%', height: RFPercentage(25), justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }} >
                <View style={{ marginTop: RFPercentage(-7.6), width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                    <TouchableOpacity onPress={() => props.navigation.navigate("LoginScreen")} activeOpacity={0.8} style={{ position: 'absolute', left: 0 }} >
                        <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2) }} color={Colors.white} />
                    </TouchableOpacity>
                    <Text style={{ color: Colors.white, fontSize: RFPercentage(4), fontWeight: 'bold' }} >
                        Signup
                    </Text>
                </View>

                <View style={{ width: '100%', height: RFPercentage(9), position: 'absolute', bottom: 0, backgroundColor: Colors.white, borderTopLeftRadius: RFPercentage(14) }} />
            </View>

            <Text style={{ color: Colors.primary, fontSize: RFPercentage(4), fontWeight: 'bold', marginTop: RFPercentage(-4) }} >
                Create an account
            </Text>

            {/* Input field */}
            <View style={{ marginTop: RFPercentage(3.8), justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {inputField.map((item, i) => (
                    <View key={i} style={{ marginTop: i == 0 ? RFPercentage(2) : RFPercentage(3) }} >
                        <InputField
                            placeholder={item.placeholder}
                            placeholderColor={Colors.white}
                            height={RFPercentage(6.8)}
                            leftIconName={item.iconName}
                            backgroundColor={Colors.primary}
                            // onTouchStart={() => setGreenBorder(true)}
                            // onTouchEnd={() => setGreenBorder(false)}
                            borderWidth={RFPercentage(0.2)}
                            borderColor={Colors.grey}
                            secure={item.secure}
                            borderRadius={RFPercentage(1.4)}
                            color={Colors.white}
                            fontSize={RFPercentage(2)}
                            handleFeild={(text) => handleChange(text, i)}
                            value={item.value}
                            width={"92%"}
                        />
                    </View>
                ))}
            </View>

            {/* Button */}
            <View style={{ width: "100%", alignItems: "center", marginTop: RFPercentage(4) }}>
                <MyAppButton
                    title="SIGNUP"
                    padding={RFPercentage(1.8)}
                    onPress={handleLogin}
                    backgroundColor={Colors.secondary}
                    color={Colors.white}
                    bold={false}
                    borderRadius={RFPercentage(1.5)}
                    width={"42%"}
                />
            </View>

            <View style={{ position: 'absolute', bottom: RFPercentage(3), width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }} >
                <Text style={{ color: Colors.black, fontSize: RFPercentage(1.9), fontWeight: '500' }} >
                    Already have an account?
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("LoginScreen")} activeOpacity={0.7} style={{ marginLeft: RFPercentage(0.6) }} >
                    <Text style={{ color: Colors.secondary, fontSize: RFPercentage(1.9), fontWeight: 'bold', textDecorationLine: 'underline' }} >
                        Log in
                    </Text>
                </TouchableOpacity>
            </View>

        </Screen>
    );
}

export default SignupScreen;