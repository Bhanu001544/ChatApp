import { ScrollView, Text, View , Image, Alert} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import {useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';



const SignUp = () => {

  const [form, setForm] = useState({
    email : '',
    password : ""
  })

  const submit = async () =>{

    if (form.email==="" || form.password==="") {
      Alert.alert("Error", "Please fill in all fields")
    }
    createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(() => {
          console.log('Signup success')
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
            mt-10 font-psemibold">Sign Up</Text>


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
            title="Sign Up"
            handlePress={submit}
            containerStyles={"mt-7"}
            />

            </View>
            
            <View className="justify-center pt-5 flex-row gap-5">
                <Text className="text-lg text-gray-100 font-pregular ">
                    Already have an account
                </Text>
                <Link href="/sign-in" className="text-secondary text-lg font-psemibold" >Sign In</Link>
            </View>

        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp