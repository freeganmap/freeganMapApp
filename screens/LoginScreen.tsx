// @ts-nocheck
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable } from "react-native";
import Web3Auth, { LOGIN_PROVIDER, OPENLOGIN_NETWORK } from "@web3auth/react-native-sdk";
import Constants, { AppOwnership } from "expo-constants";
import * as Linking from "expo-linking";
import { Buffer } from "buffer";
import tw from "tailwind-react-native-classnames";
import { EvilIcons } from "@expo/vector-icons";
import { highlightColor } from "../constants/Colors";
import { createOrUpdateUser } from "../helpers/auth-helpers";
import AppContext from "../contexts/app-context";
import { ADAPTER_EVENTS, CHAIN_NAMESPACES } from "@web3auth/base";

global.Buffer = global.Buffer || Buffer;

const scheme = "web3authexposample";

const resolvedRedirectUrl =
  Constants.appOwnership == AppOwnership.Expo || Constants.appOwnership == AppOwnership.Guest
    ? Linking.createURL("web3auth", {})
    : Linking.createURL("web3auth", { scheme: scheme });

export default function App() {
  const { setAuthenticated, setUser, web3auth } = useContext(AppContext);
  const [key, setKey] = useState("");
  const [userInfo, setUserInfo] = useState<any>();
  const [errorMsg, setErrorMsg] = useState("");
  async function subscribeAuthEvents(web3auth: Web3Auth, onUserConnect?: any) {
    try {
      if (!web3auth) {
        throw new Error('web3auth undefined');
        return;
      }
    
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: any) => {
        console.log("Yeah!, you are successfully logged in", data);
        if (onUserConnect) onUserConnect(data);
      });
    
      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });
    
      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
      });
    
      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: any) => {
        console.log("some error or user have cancelled login request", error);
      });
    } catch(e) {}
  }
  const onUserConnect = (data: any) => {
    setAuthenticated(true);
    setUser({
      ...data.userInfo,
      ...data.privKey,
    })
    fetch('//localhost:3000/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue'
      })
    })
  };
  // console.warn('web3auth', web3auth)
  if (web3auth) {
    subscribeAuthEvents(web3auth, onUserConnect);
  }
  const loginWithGoogle = async () => {
    try {
      if (!web3auth) return;
      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.GOOGLE,
        redirectUrl: resolvedRedirectUrl,
      });
      setKey(state.privKey || "no key");
      const user = {
        ...state.userInfo,
        privKey: state.privKey,
      };
      setUser(user)
      createOrUpdateUser(user)
      // TODO: ensure uniqueness?
      if (!!state.privKey) {
        setAuthenticated(true);
      }
    } catch (e) {
      setErrorMsg(String(e));
    }
  };
  const loginWithFacebook = async () => {
    try {
      if (!web3auth) return;
      const state = await web3auth.login({
        loginProvider: LOGIN_PROVIDER.FACEBOOK,
        redirectUrl: resolvedRedirectUrl,
      });
      setKey(state.privKey || "no key");
      const user = {
        ...state.userInfo,
        privKey: state.privKey,
      };
      setUser(user)
      createOrUpdateUser(user)
      if (!!state.privKey) {
        setAuthenticated(true);
      }
    } catch (e) {
      setErrorMsg(String(e));
    }
  };
  return (
    <View style={styles.container}>
      {
        !key ?
        <>
          <View style={tw`mb-3`}>
            <EvilIcons name="user" size={60} color="black" />
          </View>
          <Text style={{
            ...tw`text-2xl mb-8`,
            fontFamily: 'Raleway_700Bold',
          }}>
            Choose a login method
          </Text>
          <Pressable onPress={loginWithGoogle}
            style={{
              ...tw`py-3 px-10 my-1 bg-red-500`,
              borderRadius: 10,
            }}>
              <View style={tw`px-5`}>
                <Text style={{
                  ...tw`text-white text-xl`,
                  fontFamily: 'Raleway_700Bold',
                }}>Login with Google</Text>
              </View>
          </Pressable>
          <Pressable onPress={loginWithFacebook}
            style={{
              ...tw`py-3 px-10 my-2 bg-blue-500`,
              borderRadius: 10,
            }}>
              <View style={tw`px-1`}>
                <Text style={{
                  ...tw`text-white text-xl`,
                  fontFamily: 'Raleway_700Bold',
                }}>Login with Facebook</Text>
              </View>
          </Pressable>
        </>
        :
        (
          <View>
            <Text>LOGGED IN</Text>
            <Text>Key: {key}</Text>
            <Text>userInfo: {JSON.stringify(userInfo)}</Text>
          <Text>Error: {errorMsg}</Text>
          <Text>Linking URL: {resolvedRedirectUrl}</Text>
          <Text>appOwnership: {Constants.appOwnership}</Text>
          <Text>executionEnvironment: {Constants.executionEnvironment}</Text>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
