import { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View, Dimensions } from 'react-native';
import { darkTheme } from '../../theme/theme'; 

const { width } = Dimensions.get('window');
const HORIZONTAL_MARGIN = 20;
const FINAL_POSITION_Y = 40; 
const EXIT_POSITION_Y = -300; 

const FlashMessage = ({ message, type, isVisible }) => {
  const animatedValue = useRef(new Animated.Value(EXIT_POSITION_Y)).current; 
  
  const colors = {
    success: darkTheme.colors.success,
    error: darkTheme.colors.error,
    info: {
        background: '#2196F3', 
        text: '#fff' 
    }
  };

  const backgroundColor = colors[type]?.background || colors.info.background;
  const textColor = colors[type]?.text || colors.info.text;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animatedValue, {
        toValue: FINAL_POSITION_Y,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(animatedValue, {
            toValue: EXIT_POSITION_Y,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 3000); 
      });
    } else {
        animatedValue.setValue(EXIT_POSITION_Y);
    }
  }, [isVisible, animatedValue]);

  return (
    <View style={styles.absoluteWrapper} pointerEvents="box-none"> 
      <Animated.View
        style={[
          styles.container,
          { backgroundColor },
          { transform: [{ translateY: animatedValue }] },
        ]}
      >
        <Text style={[styles.messageText, {color: textColor}]}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
    absoluteWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center', 
        pointerEvents: 'none', 
    },
    container: {
        width: width - (HORIZONTAL_MARGIN * 2), 
        minHeight: 60, 
        justifyContent: 'center', 
        alignItems: 'center',     
        borderRadius: 8, 
        
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 15,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    messageText: {
        fontSize: 12,
        textAlign: 'center',
    },
});

export default FlashMessage;