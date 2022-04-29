import { Button, Box, Text, Center } from "@chakra-ui/react"

const BottomNavBtn = (props) => {
    return (
        <Button onClick={() => props.onClick()} variant='ghost'>
            <Box p={3} >
                <Text fontSize={'3xl'} ><Center>{props.icon}</Center></Text>
                <Text align={'center'} fontSize={'xs'}>{props.label}</Text>
            </Box>
        </Button>
    )
}

export default BottomNavBtn;