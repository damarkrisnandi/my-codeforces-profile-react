import { Box, Center, Spinner } from "@chakra-ui/react"
import ContainerContest from "./ContainerContest"

export function DefaultTable(props) {
    return (
        <div>
            {   props.list.length === 0 ? 
                        (
                            <Center h='100px' w={'4xl'}>
                                <Spinner color='red' />
                            </Center>
                        ) :
                        props.list.map((data) => (
                            <Box marginBottom={3} key={data.contestId}>
                                <ContainerContest 
                                contestId={data.contestId}
                                contest={data.contestName} 
                                oldRating={data.oldRating} 
                                newRating={data.newRating}
                                /><hr />
                            </Box>
                            
                            
                        ))
                }
        </div>
    )
}