import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useEffect, useLayoutEffect, } from 'react'
import { StatusBar } from 'expo-status-bar'
import { GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat'
import { icons, images } from '../constants'
import MaterialCommuityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebase/firebase';
import { useGlobalContext } from '../context/GlobalProvider'
import { router } from 'expo-router'
import {v4 as uuidv4} from 'uuid'
import Groq from 'groq-sdk'
import { SafeAreaView } from 'react-native-safe-area-context'

const client = new Groq({
  apiKey: "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", // This is the default and can be omitted
});

const Ai = {_id : "indiana.tech@gmail.com"}

const Home = () => {
  const [messages, setMessages] = useState([])
  const [res, setRes] = useState({})
  const { user, setUser, setIsLoggedIn } = useGlobalContext()
  const chatId = user ? user.email : "";



  useLayoutEffect(() => {

    const collectionRef = collection(database, 'chats');
    const q = query(
      collectionRef,
      where('chatId', '==', chatId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const fetchData = async (text) => {
    try {
      const response = await fetch("http://34.134.236.107:8000/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text 
        })
      })

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error("Error", error)
    }


  }

  const fetchGroq = async (text) =>{
    try{
      const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: text }],
            model: 'llama3-8b-8192',
          });
    
      return chatCompletion.choices[0].message.content;
    }catch(error){
      console.log(error)
    }
    
  }


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
      chatId
    });
    fetchData(text).then((data) => {
      addDoc(collection(database, 'chats'), {
        _id : uuidv4(),
        createdAt :new Date(),
        text: data,
        user :Ai,
        chatId :chatId
      });
    })
    
  }, []);

  const renderAvatar = (props) => {
    return (
      <View {...props}>
        <Image
          resizeMode='contain'
          source={images.itech_logo}
          className='w-[45px] h-[45px] rounded-full mb-4'
        />
      </View>
    )
  }

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        renderComposer={() => (
          <View style={styles.customInputContainer}>
            <TextInput
              placeholder="Type a message..."
              style={styles.customInput}
              multiline
              onChangeText={(text) => props.onTextChanged(text)}
              value={props.text}
            />
          </View>
        )}
      />
    )
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommuityIcons
            name='send-circle'
            style={{ marginBottom: 5, marginRight: 5 }}
            color='#21ff21'
            size={40} />
        </View>
      </Send>
    )
  }

  const logout = async () => {
    await signOut(auth).catch(error => console.log('Error logging out: ', error));
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary pb-3 h-full">
      <StatusBar backgroundColor='#161622' style='light' />
      <TouchableOpacity
        onPress={logout}
        className="flex w-full items-end -ml-4"
      >
        <Image
          source={icons.logout}
          resizeMode="contain"
          className="w-6 h-6"
        />
      </TouchableOpacity>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
        }}
        renderAvatar={renderAvatar}
        renderInputToolbar={renderInputToolbar}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
      />
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  inputToolbar: {
    borderTopWidth: 0, // Remove default border
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    marginTop: 5,
  },
  customInputContainer: {
    width: '85%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
  },
  customInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
  },
});


export default Home