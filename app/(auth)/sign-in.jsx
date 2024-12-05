import { ScrollView, Text, View , Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import {useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { Alert } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";


const SignIn = () => {
  const [form, setForm] = useState({
    email : '',
    password : ""
  })

  const submit = async () =>{

    if (form.email ==="" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields")
      return
    }
    signInWithEmailAndPassword(auth, form.email, form.password)
        .then(() => {
          console.log("Login success")
          router.replace("/landing")
        })
        .catch((err) => Alert.alert("Login error", err.message));
    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-4 h-full">
            <View className = "h-[250px] -mt-10">
            <Image
            source = {images.itech_logo}
            resizeMode = 'contain'
            className = "w-full [h-150px]" />
            </View>
            
            <View>
            <Text className="text-2xl text-white text-semibold
            mt-16 font-psemibold">Log in</Text>

            <FormField
            title = "Email" 
            value = {form.email}
            handleChangeText = {(e)=> setForm({
                ...form,
                email: e
            })}
            otherStyles='mt-7'
            keyboardType = 'email-address'
            />

            <FormField
            title = "Password" 
            value = {form.password}
            handleChangeText = {(e)=> setForm({
                ...form,
                password: e
            })}
            otherStyles='mt-7'
            />

            <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles={"mt-7"}
             />
            </View>
            
            <View className="justify-center pt-5 flex-row gap-5">
                <Text className="text-lg text-gray-100 font-pregular ">
                    Don't have an account?
                </Text>
                <Link href="/sign-up" className="text-secondary text-lg font-psemibold" >Sign Up</Link>
            </View>

        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn