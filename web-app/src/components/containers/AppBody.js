import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';  
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../Header';
import LeftDrawer from '../LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../../data';

class AppBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    const isAuthenticated = this.props.auth && this.props.auth.isAuthenticated;

    let menus = isAuthenticated? Data.authMenus : Data.guestMenus;

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)} 
                  auth={this.props.auth}/>

          <LeftDrawer navDrawerOpen={navDrawerOpen}
                      menus={menus}
                      auth={this.props.auth}/>

          <div style={styles.container}>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

AppBody.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
  auth: PropTypes.object
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default compose(connect(mapStateToProps, null), withWidth())(AppBody);
