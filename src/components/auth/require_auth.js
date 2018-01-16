// Copy-Paste from Github ->
// Higher-Order-Components/src/components/require_authentication.js
import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    // must declare which context types are required first
    // before they can be used
    // then can access router from within i.e. this.context.router
    static contextTypes = {
      // get access to router (react-router) from anywhere in the app by using
      // Authentication.contextTypes
      router: React.PropTypes.object
    };

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authneticated) {
        this.context.router.push('/');
      }
    }

    render() {
      // console.log(this.props.authenticated);

      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}