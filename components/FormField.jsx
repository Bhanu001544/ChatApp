import { View, Text, TextInput, TouchableOpacity, Image , StyleSheet} from 'react-native'
import React from 'react'
import {useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles,otherStyle, otherParams, ...props}) => {
  const [showPassword, setshowPassword] = useState(false)
  const [inputHeight, setInputHeight] = useState(16); // Initial height for the TextInput
    return (
    <View className = {`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}</Text>

        <View className={`border-2 border-black-200 
        rounded-2xl focus:border-secondary 
        items-center w-full ${otherParams ? `` : "h-16"} px-4 bg-black-100 flex-row `}>
            <TextInput 
              className={`flex-1 text-white font-psemibold`}
              style={[
                styles.textInput,
                otherParams && { height: inputHeight }, // Apply dynamic height if expandable
              ]}
              value={value}
              placeholder={placeholder}
              placeholderTextColor = "#7b7b8b"
              onChangeText = {handleChangeText}
              secureTextEntry = {title === 'Password' && !showPassword }
              multiline= {otherParams}
              onContentSizeChange={
                otherParams
                  ? (event) => {
                    setInputHeight(event.nativeEvent.contentSize.height);
                  }
                  : undefined
              } />

            {title === 'Password' && 
            (<TouchableOpacity onPress = {() =>{
                setshowPassword(!showPassword)
            }} >
                <Image source={!showPassword ? icons.eye : icons.eyeHide}
                className="w-6 h-6 "
                resizeMode = 'contain' />
            </TouchableOpacity>)}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
  },
});

export default FormField 