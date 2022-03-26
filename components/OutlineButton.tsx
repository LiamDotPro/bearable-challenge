import styled from "styled-components/native";
import Container from "./Container";

const OutlineButton = styled<{ disabled?: boolean }>(Container)`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 12px;
  border: 1px dashed ${props => props.theme.colors.gray.medium};
  background: ${props => props.disabled ? props.theme.colors.gray.dark : props.theme.colors.gray.light}
`

export default OutlineButton