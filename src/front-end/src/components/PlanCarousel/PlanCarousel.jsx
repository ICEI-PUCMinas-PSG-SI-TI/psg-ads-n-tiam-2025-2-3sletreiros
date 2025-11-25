import Carousel from 'react-native-reanimated-carousel';
import { View, Text, Dimensions } from 'react-native';
import { PlanCard } from './PlanCard';

const { width } = Dimensions.get('window');

export function PlansCarousel({plans}) {
  return (
    <Carousel
      width={width}
      data={plans}
      renderItem={({ item }) => (
        <PlanCard plan={item} />
      )}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 90,
        parallaxAdjacentItemScale: 0.85
      }}
    />
  );
}