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
import {TextField }from '@material-ui/core';
//import { pink } from '@material-ui/core/colors';


class ReimbursabilityCheck extends Component {
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
                <h2 style={{ color: '#c0548e'}}>Reimbursability Check </h2>
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
              id="ReceiptExtractionMerchant"
              label="Merchant"
              style={{ margin: 8,borderBottomColor:'green' }}
              margin="normal"         
            />   
             <TextField
              fullWidth
              id="ReceiptExtractionDeliverymethod"
              label="Delivery Method"
              style={{ margin: 8,borderBottomColor:'green' }}
              margin="normal"         
            />   
            <TextField
              fullWidth
              id="ReceiptExtractionDate"
              label="Date"
              style={{ margin: 8,borderBottomColor:'green' }}
              margin="normal"         
            /> 
            </FormControl>
            <Grid container spacing={1}>
                <Grid item xs={5}>    
                <TextField
                  fullWidth
                  id="ReceiptAmount"
                  label="Amount"
                  style={{ margin: 8,borderBottomColor:'green' }}
                  margin="normal"         
                />           
                </Grid>
                <Grid item xs={4}>  
                <TextField
                  fullWidth
                  id="ReceiptExtractionVATAmount"
                  label="VAT Amount"
                  style={{ margin: 8,borderBottomColor:'green' }}
                  margin="normal"         
                />             
                </Grid>
                </Grid>
                <Grid container spacing={1}>
                <Grid item xs={5}>    
                <TextField
                  fullWidth
                  id="ReceiptExtractionVATPercentage"
                  label="VAT Percentage"
                  style={{ margin: 8,borderBottomColor:'green' }}
                  margin="normal"         
                />           
                </Grid>
                <Grid item xs={4}>  
                <TextField
                  fullWidth
                  id="ReceiptExtractionCurrency"
                  label="Currency"
                  style={{ margin: 8,borderBottomColor:'green' }}
                  margin="normal"         
                />             
                </Grid>
                </Grid>
                <FormControlLabel id ="Rembersable" 
                    control={
                      <Checkbox checked={true}  value="checkedA" style = {{'margin-left':'10px!important'}} />
                    }
                    label=" Rembersable ?"
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
    <div id='Receipt Extraction Buttons'>
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
    </div>
      </FormGroup>
    </div>
    </div>
  );
}
}
export default ReimbursabilityCheck;
