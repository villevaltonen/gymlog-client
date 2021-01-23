import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Register from "./components/Signup";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthenticationProvider } from "./components/providers/AuthenticationProvider";
import { ResultProvider } from "./components/providers/ResultProvider";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 0 2rem;
  display: grid;
  justify-content: center;
`;

const App = () => {
  return (
    <StyledDiv className="App">
      <AuthenticationProvider>
        <Router>
          <ResultProvider>
            <Navbar />
          </ResultProvider>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/dashboard">
              <ResultProvider>
                <Dashboard />
              </ResultProvider>
            </Route>
            <Route exact path="/signup">
              <Register />
            </Route>
          </Switch>
        </Router>
        <Footer />
      </AuthenticationProvider>
      {}
    </StyledDiv>
  );
};

export default App;
