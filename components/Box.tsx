import styled from 'styled-components/native'
import Container from "./Container";

const Box = styled<{ active?: boolean; flexGrow: boolean; }>(Container)`
  border: 2px solid ${props => props.active ? props.theme.colors.blue : 'transparent'};
  flex-grow: ${props => props.flexGrow ? 1 : 0};
`

export default Box