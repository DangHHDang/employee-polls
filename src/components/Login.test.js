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
    test("Check username field is there in the SignIn component.", () => {
        var username = component.getAllByText(/Username/);
        expect(username.length).toEqual(1);
    });

    test("Check username field is there in the SignIn component.", () => {
        var username = component.getByTestId("username");
        expect(username).toBeInTheDocument();
    });

    test("Check password field is there in the SignIn component.", () => {
        var password = component.getAllByText(/Password/);
        expect(password.length).toEqual(1);
    });

    test("Check password field is there in the SignIn component.", () => {
        var password = component.getByTestId("password");
        expect(password).toBeInTheDocument();
    });

    test("Check Sign In button is there in the SignIn component.", () => {
        var signInButton = component.getByTestId("sign-in");
        expect(signInButton).toBeInTheDocument();
      });

    it("should match the snapshot", () => {
        expect(component).toMatchSnapshot();
    });
});


describe("FireEvent testing with SignIn component", () => {

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

    test("If we input the username or password, then it should show the error message", () => {
        var username = component.getByTestId("username");
        fireEvent.change(username, { target: { value: "mtsamis" } });

        var password = component.getByTestId("password")
        fireEvent.change(password, { target: { value: "12345678" } });

        var signInButton = component.getByTestId("sign-in");
        fireEvent.click(signInButton);
        expect(component.getByTestId("error-header")).toBeInTheDocument();
      });
});