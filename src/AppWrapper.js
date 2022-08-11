import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react'; 
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, API , Storage , AWS, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import App from './App.js'
import '@aws-amplify/ui-react/styles.css';
import { useTheme, Heading, Text } from '@aws-amplify/ui-react'
import { render } from '@testing-library/react';


Amplify.configure(awsconfig);

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false,
    },
  },
};

const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

class AppWrapper extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }

render(){
  return (
    <Authenticator
    variation="modal"
    formFields={formFields}
    components={components}
    hideSignUp={true}
    >
      {({ signOut, user }) => (
        <div id="root">
        <App signOut={signOut} user={user} />
        </div>
      )}
    </Authenticator>
  );
}
}

export default (AppWrapper)