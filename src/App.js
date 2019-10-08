import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout/MainLayout'

//import routs
import Home from './components/pages/Home/HomePage';
import NotFound from './components/pages/NotFound/NotFoundPage';
import Contact from './components/pages/Contact/ContactPage';
import Faq from './components/pages/Faq/FaqPage';
import Regulations from './components/pages/Regulations/RegulationsPage';
import Product from './components/pages/Product/ProductPage';

class App extends React.Component {

  render() {
    return (
      <MainLayout>
            <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/faq" exact component={Faq} />
            <Route path="/regulamin" exact component={Regulations} />
            <Route path="/kontakt" exact component={Contact} />
            <Route path="/product/:id" component={Product} />
            <Route component={NotFound} />
            </Switch>
        </MainLayout>
    );
  }

};

export default App;