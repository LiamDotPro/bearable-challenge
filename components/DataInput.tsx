import React, {useState} from "react";
import Card from "./Card";
import OutlineButton from "./OutlineButton";
import Text from "./Text";
import Container from "./Container";
import Box from "./Box";
import {useAppDispatch} from "../store/hooks";
import {addNewEntry} from "../store/entriesSlice";
import {uuid} from "../shared/uuid";
import {TouchableWithoutFeedback, View} from "react-native";

const moodBoxes: {
    score: 1 | 2 | 3 | 4 | 5,
    color: string,
}[] = [
    {score: 1, color: 'pastel.red'},
    {score: 2, color: 'pastel.orange'},
    {score: 3, color: 'pastel.yellow'},
    {score: 4, color: 'pastel.green'},
    {score: 5, color: 'pastel.teal'}
]

const possibleFeelings: string[] = ['Meh', 'Content', 'Happy', 'Frustrated']


const DataInput: React.FC = () => {

    const dispatch = useAppDispatch()

    const [score, setScore] = useState<1 | 2 | 3 | 4 | 5>(null);
    const [selectedFeelings, setSelectedFeelings] = useState([]);

    const updateMoodAssessment = (score: 1 | 2 | 3 | 4 | 5) => setScore(score)

    const addNewFeeling = (feeling: string) => {
        if (selectedFeelings.includes(feeling)) return;
        setSelectedFeelings([...selectedFeelings, feeling])
    }

    const submitEntry = () => {
        if (!score || !selectedFeelings.length) return;

        dispatch(addNewEntry({
            entry: {
                feelings: selectedFeelings,
                moodAssessment: score,
                // I'm not a massive fan of using uuid like this, but for the
                // use case of this app, it's fine. I'd recommend generating a serverside
                // id and logging it in the database, but as this app not aware it's fine.
                id: uuid()
            }
        }))
        setScore(null)
        setSelectedFeelings([])
    }

    return (
        <Card>
            <Container>
                {/*mood assessment*/}
                <Text mt={10} ml={10}>Select you're mood from 1-5</Text>
                <Container m={10} flexDirection='row'>
                    {moodBoxes.map((item, i) =>
                        <TouchableWithoutFeedback onPress={() => updateMoodAssessment(item.score)}>
                            <Box
                                key={`score-selector-${item.score}`}
                                active={score === item.score}
                                mr={i !== moodBoxes.length ? 2 : 0}
                                borderRadius="6px"
                                bg={item.color}
                                alignItems='center'
                                p={2}
                                flex
                            ><Text color={'white'}>{item.score}</Text>
                            </Box>
                        </TouchableWithoutFeedback>
                    )}
                </Container>
                {/*feelings*/}
                <Text mt={10} ml={10}>Select between 1-4 feelings</Text>
                <Container m={10} flexDirection='row'>
                    {possibleFeelings.map((item, i) =>
                        <TouchableWithoutFeedback onPress={() => addNewFeeling(item)}>
                            <Box
                                key={`feeling-selector-${item}`}
                                active={selectedFeelings.includes(item)}
                                mr={i !== moodBoxes.length ? 2 : 0}
                                borderRadius="6px"
                                bg={'gray.medium'}
                                justifyContent='center'
                                alignItems='center'
                                flex
                                p={2}><Text>{item}</Text>
                            </Box>
                        </TouchableWithoutFeedback>
                    )}
                </Container>
            </Container>
            <TouchableWithoutFeedback onPress={() => submitEntry()}>
                <OutlineButton disabled={score === null || selectedFeelings.length === 0}>
                    <Text>Add new
                        entry +</Text>
                </OutlineButton>
            </TouchableWithoutFeedback>
        </Card>
    )
}

export default DataInput