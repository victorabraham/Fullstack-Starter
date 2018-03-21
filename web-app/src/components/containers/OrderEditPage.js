import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { grey400 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../PageBase';
import {calculateTotal} from '../../utils/orderHelpers'

import * as actions from '../../actions/orderActions';

const styles = {
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  },
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  columns: {
    name: {
      width: '40%'
    },
    quantity: {
      width: '20%'
    },
    price: {
      width: '20%'
    },
    time: {
      width: '20%'
    }
  }
};

export class OrdersEditPage extends React.Component {

  constructor(props) {
    super(props);
    let currentOrder = {
      orderItems: []
    }
    this.state = {
      currentOrder: Object.assign(currentOrder, this.props.currentOrder)
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentOrder !== nextProps.currentOrder) {
      this.setState({currentOrder: calculateTotal(nextProps.currentOrder)});
    }
  }

  onChange(event, itemId) {
    const field = event.target.name;
    let currentOrder = this.state.currentOrder;
    if(itemId) {
      currentOrder.orderItems.map(item => {
        if(item.id === itemId) {
          let val = event.target.value;
          if(field == 'price') {
            val = parseFloat(val);
          }else if(field == 'quantity') {
            val = parseInt(val);
          }
          item[field] = val;
        }
      });
      currentOrder = calculateTotal(currentOrder);
    }else {
      currentOrder[field] = event.target.value;
    }
    return this.setState({currentOrder: currentOrder});
  }

  onSave(event) {
    event.preventDefault();
    console.log(this.state.currentOrder);
    // this.props.actions.saveOrder(this.state.currentOrder);
  }

  render() {
    if (!this.props.currentOrder) {
      return (<span>Loading...</span>);
    }
    return (
      <PageBase title="Order"
        navigation="Application / Edit Order">
        <form  onSubmit={this.onSave}>
          <SelectField
            floatingLabelText="Status"
            value="In Progress"
            fullWidth={true}>
            <MenuItem key={0} primaryText="In Progress" />
            <MenuItem key={1} primaryText="Complete" />
          </SelectField>
          Total : {this.state.currentOrder.total}
          <p>Items</p>
          <Divider />
          <div>
            <Table selectable={false}>
              <TableHeader displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn style={styles.columns.name}>Product</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.quantity}>Quantity</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.price}>Price</TableHeaderColumn>
                  <TableHeaderColumn style={styles.columns.time}>Time</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.currentOrder.orderItems.map((item) =>
                  <TableRow key={item.id}>
                    <TableRowColumn style={styles.columns.name}>
                      <TextField
                        hintText="Name"
                        name="name"
                        value={item.name}
                        onChange={(e) => this.onChange(e, item.id)}
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.quantity}>
                      <TextField
                        hintText="Quantity"
                        name="quantity"
                        value={item.quantity}
                        type="number"
                        onChange={(e) => this.onChange(e, item.id)}
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.price}>
                      <TextField
                        hintText="Price"
                        name="price"
                        value={item.price}
                        type="number"
                        onChange={(e) => this.onChange(e, item.id)}
                      />
                    </TableRowColumn>
                    <TableRowColumn style={styles.columns.time}>
                      {new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit'
                      }).format(Date.parse(item.createdAt))
                      }
                    </TableRowColumn>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div style={styles.buttons}>
            <Link to="/orders">
              <RaisedButton label="Cancel" />
            </Link>

            <RaisedButton label="Save"
              style={styles.saveButton}
              type="submit"
              primary={true} />
          </div>
        </form>
      </PageBase>
    );
  }
}

OrdersEditPage.propTypes = {
  actions: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  currentOrder: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  let currentOrder = {
    orderItems: []
  };
  let orderId = ownProps.match.params.orderId;
  if (orderId) {
    for (let order of state.orders) {
      if (order.id === orderId) {
        currentOrder = order
      }
    }
  }
  return {
    orders: state.orders,
    currentOrder
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersEditPage);
