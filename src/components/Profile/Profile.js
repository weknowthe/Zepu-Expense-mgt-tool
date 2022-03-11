import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import './App.css';
import logo from '../../images/Zepu1x.png';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {TextField }from '@material-ui/core';
//import { pink } from '@material-ui/core/colors';


class Profile extends Component {
  render(){
  return (
    <div name = 'login' style={{     
      margin: '0 auto'}}>
    <div name = 'logo'>
      <FormGroup  className ='' style={{        
        margin: '0 auto',
        'margin-top':'41px',
        width:'441px',
    }}>
    <FormControl>
    </FormControl>   
    </FormGroup>
    </div>
    <div name = 'form' style={{ 'margin-top': '16px' }}> 
        <FormGroup className ='' style={{
          margin: '0 auto',
          //'margin-left': '23px',
          width:'929px'
    }}>   

    <FormControl>    
    <FormControl>
    <img  id='logo' src={logo}  alt="Zepu logo"
          align="middle"
          style={{width:'108px',height:'105px'}}  
          className ='center'
    />     
    </FormControl>

    <FormLabel className ='left' style={{ 'text-align':'left','margin-top': '23px','margin-left': '13px'}}>
                <h1 style={{ color: '#ff647f'}}> User Name </h1>
      </FormLabel>
     </FormControl>

    <FormControl>
    <FormLabel id = 'CompanyInvoiceAddress' style={{ 'text-align':'left','margin-top': '23px',color: '#c0548e','margin-left':'10px' }}>
                 <h4>Address</h4>
    </FormLabel>            
    </FormControl> 
    <FormControl>
    <Grid container spacing={4}>
        <Grid item xs={4}>
        <TextField
         fullWidth
         id="UserProfileStreetandNumber"
         label="Street and Number"
         style={{ margin: 8,borderBottomColor:'green' }}
         margin="normal"         
      />    
      </Grid>
      <Grid item xs={4}>
        <TextField
        fullWidth
        style={{ margin: 8 }}
        margin="normal"
        id="CompanyPostCode"
        label="PostCode"      
      />
      </Grid>
      <Grid item xs={4}>
        <TextField
        fullWidth
        style={{ margin: 8 }}
        margin="normal"
        id="UserProfileCity"
        label="City"        
      />
      </Grid>
     </Grid>              
    </FormControl>      
    <FormLabel style={{ 'text-align':'left','margin-top': '23px',color: '#c0548e','margin-left':'10px' }}>
                 <h4>Responsible Person</h4>
    </FormLabel>  
    <FormControl>
    <Grid container spacing={4}>
        <Grid item xs={6}>
        <TextField
         fullWidth
         id="UserProfileFirstName"
         label="First Name"
         style={{ margin: 8,borderBottomColor:'green' }}
         margin="normal"         
      />    
      </Grid>
      <Grid item xs={6}>
        <TextField
        fullWidth
        style={{ margin: 8 }}
        margin="normal"
        id="UserProfileLastName"
        label="Last Name"        
      />
      </Grid>
     </Grid>              
    </FormControl> 
    <FormControl>
    <Grid container spacing={4}>
        <Grid item xs={6}>
        <TextField
         fullWidth
         id="UserProfileTelephoneNumber"
         label="Telephone Number"
         style={{ margin: 8,borderBottomColor:'green' }}
         margin="normal"         
      />    
      </Grid>
      <Grid item xs={6}>
        <TextField
        fullWidth
        style={{ margin: 8 }}
        margin="normal"
        id="UserProfileEmailid"
        label="Email-id"        
      />
      </Grid>
     </Grid>              
    </FormControl>    
   
      <ButtonGroup fullWidth row    style={{'margin-top': '33px'}}>
       <Button
        size ='small'
        style={{'background-color':'#b4ce5e','margin': '08px'}}
        
       >
        Save
      </Button>       
      <Button
        size ='medium'
        style={{'background-color':'#494949','margin': '08px'}}        
        >
        Cancel
      </Button>               
    </ButtonGroup> 
      </FormGroup>
    </div>
    </div>
  );
}
}
export default Profile;
