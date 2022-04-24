import React, { useState,useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { LogBox } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import app from '../../firebase';
//components
import Screen from './../components/Screen';
import LoadingModal from './../components/common/LoadingModal';
import MyAppButton from './../components/common/MyAppButton';
import InputField from './../components/common/InputField';
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
//config
import Colors from '../config/Colors';

function LoginScreen(props) {
    const auth = getAuth(app);
    const [indicator, showIndicator] = useState(false);
    const [inputField, SetInputField] = useState([
        {
            placeholder: "Email or Username",
            iconName: 'account-circle',
            value: "",
        },
        {
            placeholder: "Password",
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
        if (tempfeilds[0].value === "" || tempfeilds[1].value === "") {
            alert("Please fill all the feilds");
            showIndicator(false);
            return true;
        }
       try {
        // API INTEGRATION WILL COME HERE
        signInWithEmailAndPassword(auth, tempfeilds[0].value, tempfeilds[1].value)
            .then((userCredential) => {
        alert("logged in")
        showIndicator(false)
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showIndicator(false);
            alert(errorMessage)
            // ..
            });

}
 catch (error) {
    showIndicator(false);
        alert("Server issue Try Again Later");
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

            <View style={{ width: '100%', height: RFPercentage(44), justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary }} >
                <Image style={{ width: RFPercentage(22), height: RFPercentage(22), bottom: RFPercentage(3) }} source={require('../../assets/images/logo.png')} />
                <View style={{ width: '100%', height: RFPercentage(9), position: 'absolute', bottom: 0, backgroundColor: Colors.white, borderTopLeftRadius: RFPercentage(14) }} />
            </View>

            <Text style={{ color: Colors.primary, fontSize: RFPercentage(4), fontWeight: 'bold', marginTop: RFPercentage(-4) }} >
                Login
            </Text>

            {/* Input field */}
            <View style={{ marginTop: RFPercentage(3.8), justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                {inputField.map((item, i) => (
                    <View key={i} style={{ marginTop: i == 0 ? RFPercentage(2) : RFPercentage(1.8) }} >
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
                    title="LOGIN"
                    padding={RFPercentage(1.8)}
                    onPress={() => handleLogin()}
                    backgroundColor={Colors.secondary}
                    color={Colors.white}
                    bold={false}
                    borderRadius={RFPercentage(1.5)}
                    width={"42%"}
                />
            </View>

            <View style={{ position: 'absolute', bottom: RFPercentage(3), width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }} >
                <Text style={{ color: Colors.black, fontSize: RFPercentage(1.9), fontWeight: '500' }} >
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate("SignupScreen")} activeOpacity={0.7} style={{ marginLeft: RFPercentage(0.6) }} >
                    <Text style={{ color: Colors.secondary, fontSize: RFPercentage(1.9), fontWeight: 'bold', textDecorationLine: 'underline' }} >
                        Sign up
                    </Text>
                </TouchableOpacity>
            </View>

        </Screen>
    );
}

export default LoginScreen;


/**
 * signInWithEmailAndPassword(auth, tempfeilds[0].value, tempfeilds[1].value)
            .then((userCredential) => {
                showIndicator(false);
              alert("Logged in Successfully");
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showIndicator(false);
            alert(errorMessage)
            // ..
            });
 */