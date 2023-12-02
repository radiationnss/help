// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Khalti from './component/Khalti';
import PaymentComponent from './component/Payment';
import SuccessPage from './component/success';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={Khalti} />
        <Route path="/payment" component={PaymentComponent} />
        <Route path='/success' component={SuccessPage}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
