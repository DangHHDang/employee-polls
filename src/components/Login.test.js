import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import reducer from "../reducers";
import LogIn from "./Login";
const mockStore = configureStore([thunk]);

describe("LogIn", () => {
    let store, component;

    beforeEach(() => {
        store = mockStore({
            authedUser: null,
            users: {
                mtsamis: {
                    id: "mtsamis",
                    name: "Mike Tsamis",
                    password: "123456789"
                },
                zoshikanlu: {
                    id: "zoshikanlu",
                    name: "Zenobia Oshikanlu",
                    password: "123456789"
                },
            },
        });

        store.replaceReducer(reducer);

        component = render(
            <Provider store={store}>
                <Router>
                    <LogIn />
                </Router>
            </Provider>
        );
    });


    it("should match the snapshot", () => {
        expect(component).toMatchSnapshot();
    });
});