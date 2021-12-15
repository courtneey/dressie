import React from "react";
import { View, Text } from "react-native";
import { Headline, Subheading, Card, Title, Paragraph } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={{ display: "flex", alignSelf: "center", marginTop: 30, marginLeft: 10, marginRight: 10 }}>
      <Headline>Welcome!</Headline>
      <Subheading>Click on a tab below to get started.</Subheading>
      <Card style={{ height: 400, marginTop: 20 }}>
        <Card.Cover
          source={{ uri: 'https://media.theeverygirl.com/wp-content/uploads/2015/03/the-everygirl-how-to-build-a-capsule-950.jpg'}}
          style={{ margin: 10 }}
        />
        <Card.Content>
          <Title>What is Dressie?</Title>
          <Paragraph>Dressie is the solution to getting ready on time, while looking amazing — your personal mobile stylist. No more struggling to find an outfit when you're in a hurry. Dressie will take care of it for you!</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}
