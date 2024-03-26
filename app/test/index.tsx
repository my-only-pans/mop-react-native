import axios from "axios";
import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import getServerUrl from "../../utils/getServerUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {}

function Test(props: Props) {
  const [route, setRoute] = useState<string>("");
  const [method, setMethod] = useState("get");
  const [payload, setPayload] = useState<string>("");
  const [sendAuth, setSendAuth] = useState(true);
  const {} = props;

  const handlePost = async () => {
    try {
      // Retrieve the authentication token from AsyncStorage
      const authToken = await AsyncStorage.getItem("authToken");

      // Set the request headers correctly
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      // Make the POST request
      const res = await axios.post(
        getServerUrl() + route,
        {
          body: payload && JSON.parse(payload),
        },
        { headers }
      );

      // Log the response data
      console.log(res.data);
    } catch (error) {
      // Handle errors
      console.log("ERROR", error);
    }
  };

  const handleGet = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    try {
      const res = await axios.get(getServerUrl() + route, {
        params: payload && JSON.parse(payload),
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = async () => {
    switch (method) {
      case "get":
        handleGet();
        break;

      case "post":
        handlePost();
        break;

      default:
        break;
    }
  };

  return (
    <View>
      <TextInput placeholder="route" value={route} onChangeText={setRoute} />
      <RNPickerSelect
        value={method}
        onValueChange={setMethod}
        items={[
          { label: "GET", value: "get" },
          { label: "POST", value: "post" },
          { label: "PUT", value: "put" },
          { label: "DELETE", value: "delete" },
        ]}
      />
      <TextInput
        placeholder="payload"
        value={payload}
        onChangeText={(value) => setPayload(value)}
      />
      <Button onPress={handleSend}>Send</Button>
    </View>
  );
}

export default Test;
