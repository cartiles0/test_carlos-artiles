import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Index from "../pages/";
import Item from "../pages/_item";

function Body() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Index } />
          <Route path="/item/:item" component={ Item } />
        </Switch>
      </Router>
    )
  }

  export default Body
