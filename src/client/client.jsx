import React from 'react';
import Layout  from '../shared/components/Layout.jsx';
import createStore from '../shared/redux/create-store.js';
import { reduxTinyRouter } from '../shared/redux/router'

const store = createStore(window.__DATA__,window.location.href);

document.addEventListener('DOMContentLoaded', () => {
  reduxTinyRouter.init(store);
  React.render(<Layout store={store}/>,
    document.getElementById('app')
  );
});
