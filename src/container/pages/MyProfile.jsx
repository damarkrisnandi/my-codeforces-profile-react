import { 
    Box, 
    StatGroup, 
    Stat, 
    StatLabel, 
    StatNumber, 
    StatArrow, 
    Image, 
    Badge, 
    Text,
    Button 
} from "@chakra-ui/react"
import React from "react";
import { GlobalConsumer } from "../../context/context";
import { getUser, getRating } from "../../services";


class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // handle: '',
            // name: '',
            // rank: '',
            // avatar: '',
            chipColor: '',
            // chipText: '',
            // rating: 0,
            // ratingChange: 0,
            // changeColor: 'green'
        }
    }
    setColorRank = (rank) => {
        let color = '';
        switch (rank) {
            case 'newbie':
                color = 'gray';
                break;
            case 'pupil':
                color = 'green.500';
                break;
            case 'apprentice':
                color = 'blue.500';
                break;
            case 'specialist':
                color = '03A89E';
                break;
            default:
                break;
        }
        return color;
        // this.chipColor = color;
        // // this.chipText = text;
    }

    componentDidMount() {
        console.log(this.props.state.handleInfo);
        if (this.props.state.listRating.length === 0 && this.props.state.handle === '') {
            this.props.dispatch({type: 'LOAD_RATING'})
            this.setColorRank(this.props.state.handleInfo.rank)
        }
        
    }
    
    render() {
        const handleInfo = this.props.state.handleInfo;
        const listRating = this.props.state.listRating;
        const ratingChange = listRating.length > 0 ? listRating[listRating.length - 1].newRating - listRating[listRating.length - 1].oldRating : 0;
        
        return (
            <Box p={2}>
            <Box p={6}>
            <Box boxSize='sm' marginBottom={6}>
                <Image src={handleInfo.titlePhoto} alt={handleInfo.firstName} borderRadius={
                    '3xl'
                } width={"xs"}/>
                <Text fontSize={'3xl'}>{handleInfo.handle}</Text>
                <Text marginTop={'-10px'}>{handleInfo.firstName + ' ' + handleInfo.lastName}</Text>
            </Box>

            <Box marginBottom={12}>
                <StatGroup>
                    <Stat>
                        <StatLabel>Rating</StatLabel>
                        <StatNumber>{handleInfo.rating}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel>
                            <Badge variant='outline' 
                            color={this.setColorRank(handleInfo.rank)}>
                                {handleInfo.rank}
                            </Badge>
                        </StatLabel>
                        <StatNumber><StatArrow type={ratingChange > 0 ? 'increase' : 'decrease'} />{Math.abs(ratingChange)}</StatNumber>
                    </Stat>
                </StatGroup>
            </Box>
            
            <Button colorScheme='teal' variant='outline' onClick={() => {window.location.assign('http://codeforces.com/profile/' + handleInfo.handle)}}>
                GO TO MY PROFILE
            </Button>
            </Box>
        </Box>
        )
    }
}

export default GlobalConsumer(MyProfile);