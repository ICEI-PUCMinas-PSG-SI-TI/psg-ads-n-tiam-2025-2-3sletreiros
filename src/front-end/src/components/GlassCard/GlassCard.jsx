import { LinearGradient as CardContainer } from 'expo-linear-gradient';
import { useTheme } from 'styled-components';

export function GlassCard ({children, style}){
  const theme = useTheme();
  const isDark = theme.colors.background.default === '#1F2130';

  return (
    <CardContainer 
      theme={theme} 
      isDark={isDark}  
      colors={isDark 
        ? [
            theme.colors.background.surface,
            theme.colors.background.default,
            '#2A3A5C'
          ]
        : [
            '#FFFFFF',
            '#d3d3d3ff',
            '#FFFFFF'
          ]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{
        borderRadius: 20,
        padding: 24,
        margin: 16,
        marginBottom: 0,
        borderWidth: 1,
        borderColor: isDark 
          ? 'rgba(255, 255, 255, 0.15)' 
          : 'rgba(221, 108, 51, 0.3)',
        shadowColor: '#3344ddff',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: isDark ? 0.4 : 0.2,
        shadowRadius: 15,
        elevation: 8,
        overflow: 'hidden',
      }, style]}>
      {children}
    </CardContainer>
  );
};