import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/orderActions';

export class OrdersPage extends React.Component {

  render() {
    return (
      <div>{
        this.props.orders && 
        this.props.orders.map((order) => 
          <span key={order.id}>{order.id} - {order.status}</span>
        )
      }
      </div>
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
