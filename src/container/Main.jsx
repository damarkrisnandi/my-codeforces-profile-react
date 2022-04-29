import React, { Suspense } from "react";
import { Box, Grid, GridItem, Center } from "@chakra-ui/react";
import { MdPerson, MdTimeline, MdContentPaste } from 'react-icons/md';
import { BrowserRouter as Router, Route, NavLink , Routes} from 'react-router-dom';

import BottomNavBtn from "../component/BottomNavBtn";
import { GlobalProvider } from "../context/context";

const MyProfile = React.lazy(() => import('./pages/MyProfile'));
const RatingChart = React.lazy(() => import('./pages/RatingChart'));
const ListRating = React.lazy(() => import('./pages/ListRating'));

class Main extends React.Component {
    state = {
        selected: '/'
    }

    LoaderMain = () => (
        <div>Sedang memuat...</div>
    )

    componentDidMount() {
        this.setState({selected: window.location.pathname});
    }
    
    render() {
        return (
            <Router>
                <Suspense fallback={<this.LoaderMain />}>
                    <Routes>
                        <Route path={'/'} element={<MyProfile />} />
                        <Route path={'/chart'} element={<RatingChart />} />
                        <Route path={'/rating'} element={<ListRating />} />
                    </Routes>
                </Suspense>
                
                <Box bg={'gray.200'} height={'70px'} position={'fixed'} bottom={'0'} width={'100%'} p={4}>
                    <Grid templateColumns='repeat(3, 1fr)'>
                        <GridItem>
                            <Center color={this.state.selected === '/' ? 'teal.400' : ''}>
                                <NavLink to='/'>
                                    <BottomNavBtn icon={(<MdPerson />)} label={'My Profile'} onClick={() => {this.setState({selected: '/'})}} ></BottomNavBtn>
                                </NavLink>
                            </Center>
                        </GridItem>
                        <GridItem>
                            <Center color={this.state.selected === '/chart' ? 'teal.400' : ''}>
                                <NavLink to='/chart'>
                                    <BottomNavBtn icon={(<MdTimeline />)} label={'Chart'} onClick={() => {this.setState({selected: '/chart'})}} ></BottomNavBtn>
                                </NavLink>
                            </Center>
                        </GridItem>
                        <GridItem>
                            <Center color={this.state.selected === '/rating' ? 'teal.400' : ''}>
                                <NavLink to='/rating'>
                                    <BottomNavBtn icon={(<MdContentPaste />)} label={'Contests'} onClick={() => {this.setState({selected: '/rating'})}} ></BottomNavBtn>
                                </NavLink>
                            </Center>
                        </GridItem>
                    </Grid>
                </Box>
            </Router>
        )
    }
}

export default GlobalProvider(Main);