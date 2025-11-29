import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import emptyAnimation from "@assets/animations/empty-box.json";
import { Text } from "@components/Text/Text";

export function EmptyList({message}) {
  return (
    <Container>
      <LottieView
        source={emptyAnimation}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />

      <Text>{message}</Text>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
