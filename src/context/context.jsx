import React from "react";
import { getRating, getUser } from "../services";
import { globalState } from "./GlobalState";
import { Alert, AlertIcon, AlertDescription, AlertTitle } from "@chakra-ui/react";

const rootContext = React.createContext();
const Provider = rootContext.Provider;
const Consumer = rootContext.Consumer;

const GlobalProvider = (Children) => {
    return (
        class GlobalWrapper extends React.Component {
            state = {
                ...globalState,
                error: null
            };
            dispatch = (action) => {
                switch (action.type) {
                    case 'LOAD_RATING':
                        const respUser = getUser(this.state.handleInfo.handle);
                        const respRating = getRating(this.state.handleInfo.handle);
                        Promise.all([respUser, respRating]).then(([respUser, respRating]) => {
                            this.setState({listRating: respRating.result, handle: respUser.handle, handleInfo: respUser.result[0], error: null});
                        }).catch((err) => {
                            this.setState({error: 'error'}, () => {
                                setTimeout(() => {
                                    this.setState({error: null})
                                }, 3000)
                            })
                        })
                        break;
                    case 'UPDATE_STATE':
                        this.setState({listRating: action.state.listRating, handleInfo: action.state.handleInfo});
                        break;
                    default:
                        break;
                }
            }

            render() {
                return (
                    <Provider value={
                        {
                            state: this.state,
                            dispatch: this.dispatch
                        }
                    }>
                        {this.state.error ? (
                            <Alert status='error'>
                                <AlertIcon />
                                <AlertTitle>Error API</AlertTitle>
                                <AlertDescription>Silahkan Coba Beberapa Saat lagi</AlertDescription>
                            </Alert>
                        ) : (<div></div>)}
                        
                        <Children {...this.props}/>
                    </Provider>
                )
            }
        }
    )
}

const GlobalConsumer = (Children) => {
    return (
        class ParentConsumer extends React.Component {
            render() {
                return (
                    <Consumer>
                        {
                            value => (
                            <Children {...this.props} {...value}/> 
                            )
                        }
                    </Consumer>
                )
            }
        }
        
        
    )
}

export { GlobalProvider, GlobalConsumer }