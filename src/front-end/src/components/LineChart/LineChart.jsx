import { Text } from '@components/Text/Text';
import { formatToBRL } from '@utils/formatter';
import React from 'react';
import { View, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'styled-components';

const screenWidth = Dimensions.get('window').width;

export function LineChartComponent({ title, chartData, chartLegend, strokeColor, showVerticalLines = false, showHorizontalLines = false}) {
    const theme = useTheme()
    const colorScheme = useColorScheme()

  const data = {
    labels: chartData.labels || [],
    datasets: chartData.datasets
  };

  const chartConfig = {
    backgroundColor: theme.colors.background.default, 
    backgroundGradientFrom: theme.colors.background.default,
    backgroundGradientTo: theme.colors.background.default,
    
    decimalPlaces: 0,
    
    color: (opacity = 1) => `${colorScheme === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`}`,
    labelColor: (opacity = 1) => `${colorScheme === 'dark' ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`}`,

    formatYLabel: (yValue) => formatToBRL(yValue).replace('R$', ''),
    
    propsForDots: {
      r: "5",
      strokeWidth: "1",
      stroke: strokeColor || "#2ECC71"
    },
    propsForLabels: {
      fontSize: 8
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={{textAlign: 'center', marginBottom: 8, color: theme.colors.text.secondary}}>{chartLegend}</Text>
      <LineChart
        data={data}
        width={screenWidth - 40} 
        height={250}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withHorizontalLines={showHorizontalLines} 
        withVerticalLines={showVerticalLines}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      borderRadius: 16,
      overflow: 'hidden', 
      alignItems: 'center',
      width: '100%',
    },
    title: {
      textAlign: 'center',
    },
    chart: {
      borderRadius: 8,
      paddingVertical: 8,
      width: '100%',
    }
});
