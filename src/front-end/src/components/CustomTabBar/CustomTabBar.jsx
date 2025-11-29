import { PlatformPressable } from '@react-navigation/elements';
import { Icon } from "@components/Icon/Icon";
import { Container } from "@components/CustomTabBar/style";
import { useTheme } from 'styled-components';
import { useColorScheme } from 'react-native';

export function CustomTabBar({ state, descriptors, navigation, tabs }) {
  const theme = useTheme()
  const colorScheme = useColorScheme()

  const background = colorScheme === 'dark' ? theme.colors.background.surface : theme.colors.input.background

  return (
    <Container color={background}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        const label =
          options.tabBarLabel ??
          options.title ??
          route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PlatformPressable
            key={index}
            onPress={onPress}
          >
            <Icon color={isFocused ? theme.colors.primary : theme.colors.text.primary} family='MaterialIcons' name={tabs[index].icon}>
              {label}
            </Icon>
          </PlatformPressable>
        );
      })}
    </Container>
  );
}
