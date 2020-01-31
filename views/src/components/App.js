import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './landing/Home';
import NoteListContainer from './note/NoteListContainer';
import AddOrEditNoteContainer from './note/AddOrEditNoteContainer';
import HeaderNavContainer from './landing/HeaderNavContainer';
import PageNotFound from './common/PageNotFound';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <HeaderNavContainer />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/notes" component={NoteListContainer} />
            <Route exact path="/note" component={AddOrEditNoteContainer} />
            <Route exact path="/note/:id" component={AddOrEditNoteContainer} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
