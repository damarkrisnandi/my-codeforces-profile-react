import { 
    Box, 
    StatGroup, 
    Stat, 
    StatLabel, 
    StatNumber, 
    StatArrow, 
    StatHelpText,
    Center, 
    Badge, 
    Text,
    Button ,
    Skeleton,
    SkeletonText
} from "@chakra-ui/react"
import React from "react";
import Dialog from "../../component/Dialog";
import { GlobalConsumer } from "../../context/context";

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            showButtonOverlay: false
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
    }

    componentDidMount() {
        if (this.props.state.listRating.length === 0 || this.props.state.handleInfo === '') {
            this.props.dispatch({type: 'LOAD_RATING'})
            this.setColorRank(this.props.state.handleInfo.rank)
        }
        
    }
    
    render() {
        const handleInfo = this.props.state.handleInfo;
        const listRating = this.props.state.listRating;
        const ratingChange = listRating.length > 0 ? listRating[listRating.length - 1].newRating - listRating[listRating.length - 1].oldRating : 0;
        
        return (
            <Box p={2} overflowY={'scroll'} overflowX={'hidden'}>
                {listRating.length > 0 || handleInfo.titleImage ? (
                    <Box p={6}>
                    
                        <Box boxSize='sm' marginBottom={6}>
                            {/* <Image 
                            src={handleInfo.titlePhoto} 
                            alt={handleInfo.firstName} 
                            borderRadius={'3xl'} 
                            width={"xs"}
                            
                            /> */}
                            <Box 
                                backgroundImage={handleInfo.titlePhoto}
                                backgroundRepeat={'no-repeat'}
                                backgroundSize={'cover'} 
                                boxSize={'xs'}
                                borderRadius={'3xl'} 
                                width={"xs"}
                                onClick={() => {
                                    if (!this.state.showButtonOverlay) this.setState({showButtonOverlay: true})
                                    else this.setState({showButtonOverlay: false})
                                }}

                            >
                                <Center h={'xs'}>
                                    {/* {this.state.showButtonOverlay ? (

                                    ) : (<></>)} */}
                                    <Button hidden={!this.state.showButtonOverlay}
                                        onClick={() => {this.setState({dialogOpen: true})}}
                                    >
                                        Not {this.props.state.handleInfo.handle} ?
                                    </Button>
                                    <Dialog 
                                    isOpen={this.state.dialogOpen} 
                                    onClose={() => {this.setState({dialogOpen: false})}}/>
                                </Center>
                            </Box>

                            <Text fontSize={'3xl'}>{handleInfo.handle}</Text>
                            <Text marginTop={'-10px'}>{handleInfo.firstName + ' ' + handleInfo.lastName}</Text>
                        </Box>
                    
                    

                    <Box marginBottom={8} marginTop={13}>
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
                                <StatHelpText>Rating before: {listRating[listRating.length - 1].oldRating}</StatHelpText>
                            </Stat>
                        </StatGroup>
                    </Box>
                
                    <Button colorScheme='teal' variant='outline' onClick={() => {window.location.assign('http://codeforces.com/profile/' + handleInfo.handle)}}>
                        GO TO MY PROFILE
                    </Button>
                </Box>
                ) : (
                    <Box padding='6' boxShadow='lg' bg='white'>
                    <Skeleton height={'xs'} />
                    <SkeletonText mt='4' noOfLines={4} spacing='4' />
                    </Box>)
                }
            </Box>
        )
    }
}

export default GlobalConsumer(MyProfile);