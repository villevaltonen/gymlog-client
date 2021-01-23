import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Register from "./components/Signup";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthenticationProvider } from "./components/providers/AuthenticationProvider";
import CookieConsent from "./components/layout/CookieConsent";
import { ResultProvider } from "./components/providers/ResultProvider";

const App = () => {
  return (
    <div className="App">
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
        <CookieConsent />
        <Footer />
      </AuthenticationProvider>
      {}
    </div>
  );
};

export default App;
