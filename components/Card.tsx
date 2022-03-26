import styled from 'styled-components/native'
import Container from "./Container"
import React from "react"

const StyledCard = styled(Container)`
  background: ${props => props.theme.colors.gray.light}
  border-radius: ${props => props.theme.borderRadius.medium}
`


export default StyledCard
