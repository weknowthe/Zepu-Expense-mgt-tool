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
import samplebill from '../../images/samplebill.png';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {TextField } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
//import { pink } from '@material-ui/core/colors';


class ArrangePayment extends Component {
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
          width:'722px'
    }}>   

    <FormControl>    
    <FormControl>
    <img  id='logo' src={logo}  alt="Zepu logo"
          align="middle"
          style={{width:'108px',height:'105px'}}  
          className ='center'
    />     
    </FormControl>
    
    <FormLabel className ='left' style={{ 'text-align':'left','margin-top': '23px','margin-right':'12px' }}>
                <h2 style={{ color: '#c0548e'}}>Arrange Payment </h2>
      </FormLabel>
     </FormControl> 

     <Grid container spacing={1}>
            <Grid item xs={6}>  

            <FormLabel style={{ 'text-align':'left',color: '#c0548e','margin-right':'-7px'}}>
                    <h5>Compamny: Sixsentix</h5>
                    <h5>Employee: Martian</h5>
                    <h5>Position: CEO</h5>
                    <h5>Project: Averix</h5>
          </FormLabel> 


            <FormControl>
            <TextField
              fullWidth
              id="ArrangePaymentIBAN-Nr"
              label="IBAN-Nr"
              style={{ margin: 8,borderBottomColor:'green' }}
              margin="normal"         
            />   
             <TextField
              fullWidth
              id="ArrangePaymentBankName"
              label="BankName"
              style={{ margin: 8,borderBottomColor:'green' }}
              margin="normal"         
            />   
            </FormControl>
            <Grid container spacing={1}>
                <Grid item xs={5}>    
                <TextField
                  fullWidth
                  id="ArrangePaymentAmount"
                  label="Amount"
                  style={{ margin: 8,borderBottomColor:'green' }}
                  margin="normal"         
                />           
                </Grid>
                <Grid item xs={4}>  
                <TextField
                  fullWidth
                  id="ArrangePaymentCurrency"
                  label="Currency"
                  style={{ margin: 8,borderBottomColor:'green' }}
                  margin="normal"         
                />             
                </Grid>
                </Grid>
 
                <TextField
                    id="outlined-helperText"                    
                    fullWidth                   
                    placeholder ="Transaction Text"
                    helperText="Transaction Text"
                    margin="normal"
                    variant="outlined"
                  />
            </Grid>
            <Grid item xs={3}>  
            <img  id='logo' src={samplebill} border ='1'  alt="samplebill"
                  align="middle"
                  style={{width:'341px',height:'550px'}}  
                  className ='center'
            />     
            </Grid>
        </Grid>  
          <div id='Buttons'>
            <ButtonGroup fullWidth row    style={{'margin-top': '33px'}}>
            <Button
              size ='small'
              style={{'background-color':'#b4ce5e','margin': '08px'}}
              
            >
              Execute
            </Button>       
            <Button
              size ='medium'
              style={{'background-color':'#494949','margin': '08px'}}        
              >
              Cancel
            </Button>               
          </ButtonGroup> 
          </div>
      </FormGroup>
    </div>
    </div>
  );
}
}
export default ArrangePayment;
