import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { connect } from 'react-redux';
import { userLoginSuccess, userLoginFailure } from '../redux';

function LoginPage({userLoginSuccess, userLoginFailure}) {
    const clientId = '283436294814-k7vduug1bepj2pdvh8eb69gbs4ci3c8u.apps.googleusercontent.com'

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        userLoginSuccess(res.profileObj)
    };

    const onFailure = (err) => {
        userLoginFailure(err)
    };

    return (
        <div>
            <h2>Please Login to Continue</h2>
            <br />
            <br />
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
}

const mapStateToProps = state => {
  return {
      user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLoginSuccess: (user) => dispatch(userLoginSuccess(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);