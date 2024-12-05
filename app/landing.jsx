import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'


const Landing = () => {
  return (
    <SafeAreaView className = "h-full bg-primary justify-center items-center">
            <Text className = "text-white text-2xl">
                Welcome to Indiana Tech
            </Text>
            <CustomButton
          title="Start Chat"
          handlePress={()=>{router.push("/home")}}
          containerStyles="w-[70%] mt-10"
          />

        <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  )
}

export default Landing