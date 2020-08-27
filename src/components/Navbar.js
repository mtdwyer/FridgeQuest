import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import { fetchRecipes, toggleComplex } from "../actions";

const styles = {
  colorSwitchBase: {
    color: 'white',
    '&$colorChecked': {
      color: '#04ff1d',
      '& + $colorBar': {
        backgroundColor: '#04ffa5',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  };

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complex: props.complex
    };
    this.handleChange.bind(this)
  }

   handleChange = event => {
     let arr = {}
     arr.value = event.target.checked
     arr.name = 'isComplex'
    this.props.toggleComplex(arr)
    // console.log('State2: ', this.state);
    // console.log('PropComplex: ', this.props.complex.isComplex);
     
  };

  
  render() {
    //console.log('Props: ', this.props);
   // console.log('State: ', this.state);
   // console.log('isComplex:', this.state.complex);
    const { classes } = this.props;

    
    
    return(
      <div id="NavBar">
        < AppBar position="static"
          elevation={10}
         style={{
          background: "#1e68e5",
          flexGrow: 1
          }} >
          <Toolbar style={{ justifyContent: 'space-between' }}>
              <Typography  variant="title" color="inherit">
              FridgeQuest
              </Typography>

              <FormGroup style={{minWidth:175}}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={this.props.complex.isComplex} 
                      onChange={this.handleChange} 
                      aria-label="ComplexSwitch"
                      value="isComplex"
                      classes={{
                        switchBase: classes.colorSwitchBase,
                        checked: classes.colorChecked,
                        bar: classes.colorBar,
                      }}
                    />
                  }
                  value="isComplex"
                  labelPlacement='start'
                  label={<span style={{color: '#FFF', fontSize: '1.25rem'}}>Advanced Search</span>}
          />
              </FormGroup>
          </Toolbar>
        </AppBar>
      </div>
    );
    }
  };

const mapStateToProps = state => {
  return {complex: state.complex}
};

export default withStyles(styles)(connect(mapStateToProps,{fetchRecipes, toggleComplex })(Navbar))
