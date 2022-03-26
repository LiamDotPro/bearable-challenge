import React from "react";
import Container from "./Container";
import Text from "./Text";
import styled from 'styled-components/native'
import {View} from "react-native";

interface Props {
    length: number;
    moodCounts: { one: number, two: number, three: number, four: number, five: number };
    feelingName: string;
}

const colors = ['pastel.red', 'pastel.orange', 'pastel.yellow', 'pastel.green', 'pastel.teal']

const StyledBar = styled(View)`
  height: 16px;
  background: red;
`

const Bar: React.FC<Props> = ({length, moodCounts, feelingName}) => {

    const totalEntries = Object.values(moodCounts).reduce((acc, curr) => acc + curr, 0)

    /**
     * Converts a list of numbers one,two, etc too a list of percentages
     */
    const getBarPercentagesBasedOnEntries = (): number[] => {
        return Object.values(moodCounts).map(count => {
            return count / totalEntries
        })
    }

    // find index of first number above zero
    const getFirstIndexAboveZero = getBarPercentagesBasedOnEntries().findIndex(percentage => percentage > 0)

    return (
        <Container flex flexDirection="row" width={length} mt={13}>
            {getBarPercentagesBasedOnEntries().map((percentage, index) => {

                if (percentage === 0) {
                    return <></>
                }

                return <Container
                    key={`bar-visual-${feelingName}-${index}`}
                    borderTopLeftRadius={index === getFirstIndexAboveZero ? 5 : 0}
                    borderBottomLeftRadius={index === getFirstIndexAboveZero ? 5 : 0}
                    width={percentage}
                    height={16}
                    bg={colors[index]}/>
            })}

            <Container position='relative'
                       right={10}
                       top={-8}
                       border="1.5px solid"
                       borderColor='darkBlue'
                       width={48}
                       height={30}
                       borderRadius={13}
                       bg="white">
                <Text
                    mt={1}
                    fontSize={15}
                    lineHeight='18px'
                    fontWeight={600}
                    borderRadius={13}
                    textAlign='center'
                >
                    {totalEntries}
                </Text>
            </Container>
        </Container>
    )
}
export default Bar;