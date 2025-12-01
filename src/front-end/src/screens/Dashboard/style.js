import styled from "styled-components/native";


export const Header = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`

export const AccountInfo = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`

export const ProfileLogo = styled.Image`
    width: 30px;
    height: 30px;
    border-width: 1px;
`

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
  flex-direction: row;
  align-items: center;
  gap: 10px;
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