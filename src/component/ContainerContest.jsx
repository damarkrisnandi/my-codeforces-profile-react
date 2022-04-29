import { Box, StatGroup, Stat, StatLabel, StatNumber, StatArrow, Text } from "@chakra-ui/react";
const ContainerContest = (props) => {
    return (
        <div>
            <Box p={2} borderRadius={'lg'}>
                <Text fontWeight={'bold'}>[ID:{props.contestId}] {props.contest}</Text>
                <StatGroup>
                    <Stat>
                        <StatLabel>Rating</StatLabel>
                        <StatNumber>{props.newRating}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel>
                            Rating Change
                        </StatLabel>
                        <StatNumber><StatArrow type={props.newRating > props.oldRating ? 'increase' : 'decrease'} />{Math.abs(props.newRating - props.oldRating)}</StatNumber>
                    </Stat>
                </StatGroup>
            </Box>
        </div>
    )
}
export default ContainerContest;