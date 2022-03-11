import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Link from '@material-ui/core/Link';
//import './App.css';
import logo from '../../images/Zepu1x.png';
import color from '@material-ui/core/colors/grey';


class App extends Component {
  render(){
  return (
    <div name = 'login'>
    <div name = 'logo'>
      <FormGroup  className ='' style={{
        //'margin-top': '25px',
        margin: '0 auto',
        'margin-top':'100px',
        width:'441px',
    }}>
    <FormControl>
    <img  id='logo' src={logo}  alt="Zepu logo"
          align="middle"
          style={{width:'108px',height:'105px'}}  
          className ='center'
    />     
    </FormControl>   
    </FormGroup>
    </div>
    <div name = 'form' style={{ 'margin-top': '143px' }}> 
        <FormGroup className ='' style={{
          margin: '0 auto',
          width:'441px'
    }}>
    
    <FormControl>
     <InputLabel htmlFor="my-input-email-addr">Business Email Address</InputLabel>
        <Input id="my-input-email-addr" />         
      </FormControl>  
      <FormControl>
        <InputLabel htmlFor="my-password">Password</InputLabel>
        <Input id="my-password"/>  
      </FormControl>  
      <FormControlLabel id ="rememberme"
        control={
          <Checkbox checked={true}  value="checkedA" />
        }
        label="Remember me"
      />
      <Button style={{       
        'background-color':'#b4ce5e','font-size': '18pt',
        'text-align':'left',color,'text-transform': 'none!important'
    }} >
        login
      </Button> 
       
      <FormLabel style={{ 'text-align':'center','margin-top': '23px' }}>
                  Forgot your password?
      </FormLabel>
      </FormGroup>
    </div>
    </div>
  );
}
}
export default App;
