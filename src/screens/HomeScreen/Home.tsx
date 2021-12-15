import React from "react";
import { View } from "react-native";
import { Headline, Subheading, Card, Title, Paragraph } from "react-native-paper";

export default function HomeScreen(props) {
  const  { name } = props.route.params;
  return (
    <View style={{ display: "flex", alignSelf: "center", marginTop: 30, marginLeft: 10, marginRight: 10 }}>
      <Headline>Welcome, {name}!</Headline>
      <Subheading>Today's outfits are waiting for you.</Subheading>
      <Card style={{ height: 430, marginTop: 20 }}>
        <Card.Cover
          source={{ uri: 'https://media.theeverygirl.com/wp-content/uploads/2015/03/the-everygirl-how-to-build-a-capsule-950.jpg'}}
          style={{ margin: 10 }}
        />
        <Card.Content>
          <Title>What is Dressie?</Title>
          <Paragraph>Dressie is the solution to getting ready on time, while looking amazing — your personal mobile stylist. No more struggling to find an outfit when you're in a hurry. Dressie will take care of it for you!</Paragraph>
          <Paragraph style={{ marginTop: 20 }}>Click on a tab below to get started.</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}
