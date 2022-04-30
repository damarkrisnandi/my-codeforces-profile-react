import React from "react";
import CodeforcesLineChart from "../../component/CodeforcesLineChart";
import { Box, Text } from "@chakra-ui/react";
import { GlobalConsumer } from "../../context/context";
class RatingChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChange: false
        }
    }

    componentDidMount() {
        // dikosongin dulu listRatingnya untuk ngetrigger
        if (this.props.state.listRating.length === 0) { 
            this.props.dispatch({type: 'LOAD_RATING'})
        } else {
            const listRating = this.props.state.listRating;
            this.props.dispatch({type: 'UPDATE_STATE', state: {
                ...this.props.state,
                listRating: []
            }})
            
            setTimeout(() => {
                this.props.dispatch({type: 'UPDATE_STATE', state: {
                    ...this.props.state,
                    listRating
                }})
            }, 500)
        } 
    }
    
    render() { 
        const viewData = this.props.state.listRating.slice(this.props.state.listRating.length - 15, this.props.state.listRating.length)
        return (
            <div>
                <Box p={2}>
                    <Text fontSize={'2xl'}>My Current Rating</Text>
                    <Box><CodeforcesLineChart data={viewData} /></Box>
                    
                </Box>
                
            </div>
        )
    }

}

export default GlobalConsumer(RatingChart);