import React, {createContext , useContext, useState, useEffect} from 'react';
// import { getCurrentUser } from '../lib/appwrite';
import { View, Text, ActivityIndicator } from 'react-native';
import {auth} from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';


const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({children}) =>{
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  
  useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        const unsubscribeAuth = onAuthStateChanged(
          auth,
          async authenticatedUser => {
            if(authenticatedUser){
              setUser(authenticatedUser); 
              setIsLoggedIn(true)
            }else{
              setUser(null);
              setIsLoggedIn(false)
              
            };
            setIsLoading(false)
          }
        );
    // unsubscribe auth listener on unmount
        return unsubscribeAuth;
      }, []);
    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' />
          </View>
        );
      }
    
    {}
    
    return (
        <GlobalContext.Provider
            value = {{
              user,
              isLoggedIn,
              isLoading,
              setUser,
              setIsLoggedIn
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;