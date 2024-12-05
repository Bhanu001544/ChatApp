import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image} from 'react-native';
import { Link, Redirect, router } from "expo-router"
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalProvider';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default function App() {

  const {isLoading, isLoggedIn} = useGlobalContext()

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/landing" />
  }

  React.useEffect(() => {
    changeNavigationBarColor('#161622', true); // Set color and light icons
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View className="w-full justify-center items-center min-h-[84vh] px-4">
          {/* <Image 
          source = {images.logo}
          className = "w-[200px] h-[120px]"
          resizeMode = 'contain'
          
          /> */}

          <Image
          source = {images.itech_logo}
          className = "w-[300px] h-[300px]  rounded-full"
          resizeMode = 'contain' 
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              Get campus related information with the new Indiana Tech AI
            </Text>
          </View>

          <CustomButton
          title="Continue With Email"
          handlePress={()=>{router.push("./sign-in")}}
          containerStyles="w-full mt-10"
          />
        </View>

      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}
