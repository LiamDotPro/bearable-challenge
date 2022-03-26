import React from "react";
import Container from "./Container";
import Title from "./Title";
import Bar from "./Bar";

interface Props {
    title: string;
    // follows 1,2,3,4,5 resented as total counts.
    moodCounts: { one: number, two: number, three: number, four: number, five: number };
    // this is a percentage representation;
    length: number;
}

const Visual: React.FC<Props> = ({title, length, moodCounts}) => {
    return (
        <Container>
            <Title fontSize={13} color="darkBlue" lineHeight="16px" fontWeight={700}>{title}</Title>
            <Bar feelingName={title} length={length} moodCounts={moodCounts} />
        </Container>
    );
};

export default Visual;
