import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import styles from "./layout.module.css";
import Header from "../Header";
import List from "../List";
import NewList from "../NewList";
import ToDo from "../ToDo";

function Layout() {
  return (
    <div className={`container-fluid d-flex flex-column border border-danger ${styles.testing}`}>
      <Router>
        <Header />
        <div className={`flex-grow-1 overflow-y-auto border border-warning mb-3 ${styles.switchContainer}`}>
          <Switch>
            <Route path="/list" exact component={List} />
            <Route path="/new-list" exact component={NewList} />
            <Route path="/list/:id"  component={ToDo} />
            <Redirect from="/" to="/list" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Layout;
