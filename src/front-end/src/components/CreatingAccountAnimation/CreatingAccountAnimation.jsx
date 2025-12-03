import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import creatingAccount from "@assets/animations/creating-account.json"

export function CreatingAccountAnimation() {
  return (
    <Container>
      <LottieView
        source={creatingAccount}
        autoPlay
        loop
        style={{ width: 250, height: 250 }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
