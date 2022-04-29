import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { DefaultTable } from "../../component/DefaultTable";
import { GlobalConsumer } from "../../context/context";

class ListRating extends React.Component {
    column = [
        {header: 'Tanggal', field: 'tanggal'},
        {header: 'Imsak', field: 'imsak'},
        {header: 'Subuh', field: 'subuh'},
        {header: 'Dzuhur', field: 'dzuhur'},
        {header: 'Ashar', field: 'ashar'},
        {header: 'Maghrib', field: 'maghrib'},
        {header: 'Isya', field: 'isya'}, 
    ];
    constructor(props) {
        super(props);
        this.state = {
            ratings: []
        }
    }
    componentDidMount() {
        this.props.dispatch({type: 'LOAD_RATING'});
    }

    render() {
        let viewData = this.props.state.listRating.slice(this.props.state.listRating.length - 10, this.props.state.listRating.length)
        viewData.sort((a, b) => b.contestId - a.contestId);
        return (
            <div>
                <Box p={'2'} marginBottom={20}>
                    <Box maxW='6xl' borderRadius='lg' overflow='auto'> 
                          
                        <Box>
                            <Text fontSize={'2xl'} marginBottom={3}>My Current Contests</Text>
                            {/* <Text fontSize='2xl'>Jadwal Imsakiyyah Wilayah {this.props.state.lokasi} dan Sekitarnya</Text> */}
                            <DefaultTable 
                            list={viewData}
                            />
                        </Box>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default GlobalConsumer(ListRating);