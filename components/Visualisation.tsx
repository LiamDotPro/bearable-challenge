import React from "react";
import Container from "./Container";
import {useAppSelector} from "../store/hooks";
import {selectFormattedEntries} from "../store/entriesSlice";
import Visual from "./Visual";

const Visualisation: React.FC = () => {

    // Array here is ordered by weighting and memoized
    const formattedEntries = useAppSelector((state) => selectFormattedEntries(state))

    const getLengthAsPercentage = (input: number) => {
        // We use two here as we want a less dramatic shortening of the bar
        return (1 - (input / formattedEntries.length) / 2);
    }

    return <Container mt={20}>
        {formattedEntries.map((item, i) =>
            <Visual key={`visual-parent-${item[0]}`} title={item[0]} moodCounts={item[1]} length={getLengthAsPercentage(i)}/>
        )}
    </Container>
}

export default Visualisation;