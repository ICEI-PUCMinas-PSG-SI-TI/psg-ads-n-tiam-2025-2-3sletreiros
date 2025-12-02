import LottieView from "lottie-react-native";
import { animations } from "src/constants";

export function CustomAnimation({size = 120, name}) {

    const RenderedAnimation = animations[name]

    return (
        <LottieView
            source={RenderedAnimation}
            autoPlay
            loop
            style={{ width: size, height: size }}
        />
    )
}