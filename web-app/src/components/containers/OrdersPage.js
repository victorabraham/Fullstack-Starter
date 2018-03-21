import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../PageBase';

import * as actions from '../../actions/orderActions';

const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  editButton: {
    fill: grey500
  },
  columns: {
    id: {
      width: '25%'
    },
    name: {
      width: '10%'
    },
    price: {
      width: '20%'
    },
    category: {
      width: '20%'
    },
    edit: {
      width: '20%'
    }
  }
};

export class OrdersPage extends React.Component {

  render() {
    return (
      <PageBase title="Orders"
              navigation="Application / Orders">
        <div>
          <Link to="/orders/New" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table selectable={false}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>ID</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>No of Items</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>Total</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.category}>Status</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Time</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.orders &&  this.props.orders.map((order) => 
                <TableRow key={order.id}>
                  <TableRowColumn style={styles.columns.id}>{order.id}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{order.orderItems.length}</TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{order.total}</TableRowColumn>
                  <TableRowColumn style={styles.columns.category}>{order.status}</TableRowColumn>
                  <TableRowColumn style={styles.columns.category}>
                  {new Intl.DateTimeFormat('en-GB', { 
                      year: 'numeric', 
                      month: 'numeric', 
                      day: '2-digit' 
                    }).format(Date.parse(order.createdAt))
                  }
                  </TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={`/orders/${order.id}`}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>  
        </div>
      </PageBase>
    );
  }
}

OrdersPage.propTypes = {
  actions: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    orders: state.orders
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
)(OrdersPage);
