import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import Register from "./components/Signup";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthenticationProvider } from "./components/AuthenticationProvider";
import CookieConsent from "./components/layout/CookieConsent";

const App = () => {
  return (
    <div className="App">
      <AuthenticationProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
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
