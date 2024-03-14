import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

interface Props {}

interface User {
  _id: string;
  username: string;
}

const sampleData = {
  _id: "1",
  username: "testUser1",
};

function Test(props: Props) {
  const {} = props;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null); // Specify User type or null

  const fetchUser = async () => {
    const res = await axios.get("http://localhost:3000/test", {
      params: {
        _id: "65c576efa33aa4d3a65ac68d",
      },
    });

    setUser(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return (
      <View>
        <Text>No User found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>This is the test route</Text>
      <View>
        <View>
          <Text>{user._id}</Text>
          <Text>{sampleData.username}</Text>
        </View>
      </View>
    </View>
  );
}

export default Test;
