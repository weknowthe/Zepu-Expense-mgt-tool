import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import app from '../../firebase/firebase-auth'
import '../../App.css'
//import logo from '../../images/Zepu1x.png';
import logo from '../../images/Zepu1x.png';
import color from '@material-ui/core/colors/grey';


class LoginAs extends Component {
  render(){
  return (

    <div name = 'login'>
    <div name = 'logo'>
      <FormGroup  className ='' style={{
        //'margin-top': '25px',
        margin: '0 auto',
        'margin-top':'132px',
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
    <div name = 'form' style={{ 'margin-top': '16px' }}> 
        <FormGroup className ='' style={{
          margin: '0 auto',
          width:'356px'
    }}>
    

    <FormControl>
    {/* <Grid item xs={12}> */}
    <FormLabel className ='center' style={{ 'text-align':'center','margin-top': '23px', }}>
                <h1> I sign up as</h1>
      </FormLabel>
    {/* </Grid> */}
    </FormControl>  
    <FormControl>
    <Grid container spacing={3}>
        <Grid item xs={7}>
        <FormControlLabel id ="as Accountant" style = {{'margin-left':'10px!important'}}
            control={
              <Checkbox checked={false}  value="checkedA" />
            }
            label=" as Accountant"
          />
        </Grid>
        <Grid item xs={5}>
        <FormControlLabel id ="a Company"  style = {{}}
            control={
              <Checkbox checked={false}  value="checkedA" />
            }
            label=" a Company"
          />
        </Grid>
        </Grid>    
    </FormControl>  
     
      <Button style={{       
        'background-color':'#b4ce5e','font-size': '18pt',
        'text-align':'left',color,'text-transform': 'none!important', 'margin-top': '25px'}}
     >
        Next
      </Button> 
       
      <FormLabel style={{ 'text-align':'right','margin-top': '23px' }}>
                  Forgot your password?
      </FormLabel>
      </FormGroup>
      <button onClick = { () => app.auth().signOut() }>Sign Out</button>
    </div>
    </div>
  );
}
}
export default LoginAs;
