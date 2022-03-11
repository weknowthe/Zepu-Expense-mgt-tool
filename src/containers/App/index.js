import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import login from '../../components/Login';
import loginAs from '../../components/LoginAs';
import addANewEmployee from '../../components/AddaNewEmployee';
import addANewCompany from '../../components/AddaNewCompany';
import arrangepayment from '../../components/ArrangePayment';
import bookinglastpage from '../../components/BookingLastPage';
import expensepolicy from '../../components/ExpensePolicyCompliance';
import profile from '../../components/Profile';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import receiptextraction from '../../components/ReceiptExtraction';
import reimbursabilitycheck from '../../components/ReimbursabilityCheck';
//import {AuthProvider} from '../../Auth'
import PrivateRoute from '../../PrivateRoute';
const theme = createMuiTheme();

function App() {
  return (
    <MuiThemeProvider theme = { theme } >
      <CssBaseline/>
      <Router>
        <div>
            <Switch>
                <Route path = '/addnewemployee' exact component = {addANewEmployee}></Route>
                <Route path = '/arrangepayment' exact component = {arrangepayment}></Route>            
                <Route path = '/addnewcompany' exact component = {addANewCompany}></Route>
                <Route path = '/bookinglastpage' exact component = {bookinglastpage}></Route>
                <Route path = '/expensepolicy' exact component = {expensepolicy}></Route>            
                <Route path = '/profile' exact component = {profile}></Route>              
                <Route path = '/loginas' exact component = {loginAs}></Route>
                <Route path = '/receiptextraction' exact component = {receiptextraction}></Route>              
                <Route path = '/reimbursabilitycheck' exact component = {reimbursabilitycheck}></Route>
                <Route path = '/' exact component = {login}></Route>
            </Switch>
        </div>
      </Router>
     </MuiThemeProvider>
  );
}
export default App;
