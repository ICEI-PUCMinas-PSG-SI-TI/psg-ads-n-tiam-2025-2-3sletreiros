import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 6px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.input.background};
  border-width: 1px;
  border-color: ${({ theme, hasError, focused }) =>
    hasError
      ? theme.colors.error.text
      : focused
      ? theme.colors.primary
      : theme.colors.input.background};
  border-radius: 8px;
  padding: 10px 12px;
  opacity: ${({ editable }) => (editable ? 1 : 0.6)};
`;

export const IconArea = styled.View`
  margin-right: 8px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error.text};
  font-size: 12px;
  margin-top: 4px;
`;
