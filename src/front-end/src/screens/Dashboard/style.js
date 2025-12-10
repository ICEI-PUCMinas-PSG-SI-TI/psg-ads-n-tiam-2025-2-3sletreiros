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

export const SectionTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${props => props.theme.colors.text.primary};
    margin-bottom: 12px;
`

export const QuickActionsContainer = styled.ScrollView`
  flex-direction: row;
  margin-horizontal: -20px; 
  padding-horizontal: 20px;
`

export const ActionItem = styled.TouchableOpacity`
  align-items: center;
  margin-right: 24px;
  gap: 8px;
`

export const IconContainer = styled.View`
  padding: 12px;
  border-radius: 32px;
  background-color: ${props => props.theme.colors.background.surface}; 
  align-items: center;
  justify-content: center;
`

export const ActionLabel = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
`

export const DetailCardsContainer = styled.View`
  flex-direction: row;
`

export const DetailCard = styled.Pressable`
  flex: 1;
`

export const DetailLabel = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.text.secondary};
  margin-bottom: 4px;
`

export const DetailValue = styled.Text`
  font-weight: bold;
`