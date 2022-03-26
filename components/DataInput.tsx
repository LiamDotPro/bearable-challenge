import React, {useState} from "react";
import Card from "./Card";
import OutlineButton from "./OutlineButton";
import Paragraph from "./Paragraph";
import Container from "./Container";
import Box from "./Box";
import {useAppDispatch} from "../store/hooks";
import {addNewEntry} from "../store/entriesSlice";
import {uuid} from "../shared/uuid";

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
        <Card flexDirection='column'>

            <OutlineButton disabled={score === null || selectedFeelings.length === 0}
                           onClick={() => submitEntry()}>
                <Paragraph>Add new
                    entry +</Paragraph>
            </OutlineButton>
        </Card>
    )
}

export default DataInput