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
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import PageBase from '../PageBase';

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
  }
};

export class OrdersEditPage extends React.Component {

  render() {
    return (
      <PageBase title="Orders"
        navigation="Application / Order Edit">
        <form>
          <SelectField
            floatingLabelText="Status"
            value="In Progress"
            fullWidth={true}>
            <MenuItem key={0} primaryText="In Progress" />
            <MenuItem key={1} primaryText="Complete" />
          </SelectField>
          <p>Items</p>
          <Divider />

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
)(OrdersEditPage);
