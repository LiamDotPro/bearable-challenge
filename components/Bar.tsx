import React from "react";
import Container from "./Container";
import Paragraph from "./Paragraph";

interface Props {
    length: number;
    moodCounts: { one: number, two: number, three: number, four: number, five: number };
    feelingName: string;
}

const colors = ['pastel.red', 'pastel.orange', 'pastel.yellow', 'pastel.green', 'pastel.teal']

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
        <Container mt="13px" mb="13px" borderRadius={4} width={length} height="16px" flex>
            {getBarPercentagesBasedOnEntries().map((percentage, index) => {

                if (percentage === 0) {
                    return null
                }

                return <Container
                    key={`bar-visual-${feelingName}-${index}`}
                    borderTopLeftRadius={index === getFirstIndexAboveZero ? 5 : 0}
                    borderBottomLeftRadius={index === getFirstIndexAboveZero ? 5 : 0}
                    height="100%"
                    width={percentage}
                    bg={colors[index]}/>
            })}
            <Container position='relative'
                       right="14px"
                       top="-8px"
                       border="1.5px solid"
                       borderColor='darkBlue'
                       width="48px"
                       height="30px"
                       borderRadius={13}
                       bg="white">
                <Paragraph flex
                           height="100%"
                           fontSize="15px"
                           lineHeight="18px"
                           fontWeight={600}
                           borderRadius={13}
                           alignContent='center'
                           justifyContent='center'
                           alignItems='center'
                >
                    {totalEntries}
                </Paragraph>
            </Container>
        </Container>
    )
}
export default Bar;