import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import creatingProduct from "@assets/animations/creating-product.json"
import { Text } from "@components/Text/Text";

export function CreatingProductAnimation() {
  return (
    <Container>
      <LottieView
        source={creatingProduct}
        autoPlay
        loop
        style={{ width: 250, height: 250 }}
      />
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
