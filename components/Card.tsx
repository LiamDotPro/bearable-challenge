import styled from 'styled-components/native'
import Container from "./Container";
import DropShadow from "react-native-drop-shadow";
import React from "react";
import {StyleProp, ViewStyle} from "react-native";

/**
 * This may look a little strange as it's more loc to take this out of the
 * drop shadow component, but it's a slight performance tweak as it avoids
 * recreating the shadow style props object in memory
 * everytime the component is re-rendered.
 */
const styleProps: StyleProp<ViewStyle> = {
    display: "flex",
    shadowColor: "rgba(0,0,0,0.25)",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    borderRadius: 4,
}

const StyledCard = styled(Container)`
  background: ${props => props.theme.colors.gray.light};
  border-radius: ${props => props.theme.borderRadius.medium};
`

const Card: React.FC<{ flexDirection?: string }> = ({children, flexDirection}) => {
    return <DropShadow style={styleProps}>
        <StyledCard flex flexDirection={flexDirection} flexGrow={1}>
            {children}
        </StyledCard>
    </DropShadow>
}


export default Card