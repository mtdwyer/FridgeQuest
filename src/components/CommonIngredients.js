import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addItem, deleteItem } from '../actions';

const commonIngredients = ['butter','eggs', 'milk', 'sugar', 'flour', 'beef', 'pork', 'chicken'];

class CommonIngredients extends Component {
  state = {
    isDisabled: false
  };

  handleClick = (e, name) => {
    if (!this.props.fridge.ingredients.includes(name)) {
      this.props.addItem(name);
    }
  };

  render() {

    return (
      <div id='commonIngredients' style={{margin: 15}}>
        {
          (commonIngredients.map(item => {
            return (
              <div id={item} key={item}>
                <Button
                  onClick={(e) => {
                    this.handleClick(e, item)
                  }}
                  name={item}
                  key={item}
                  variant="outlined"
                  color="primary"
                >
                  {item}
                </Button>
              </div>
            );
          }))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fridge: state.fridge
});

export default connect(
  mapStateToProps,
  { addItem, deleteItem }
)(CommonIngredients);
