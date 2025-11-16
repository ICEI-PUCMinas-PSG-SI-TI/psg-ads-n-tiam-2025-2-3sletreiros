import styled from "styled-components";

export const CardContent = styled.View`
  align-items: center;
`;

export const CardTitle = styled.Text`
  font-size: 16px;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

export const ValueContainer = styled.View`
  align-items: center;
`;

export const MainValue = styled.Text`
  font-size: 34px;
  font-weight: 700;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 6px;
  letter-spacing: 0.5px;
`;

export const ProfitValue = styled.Text`
  font-size: 15px;
  color: #2ECC71;
  font-weight: 600;
`;