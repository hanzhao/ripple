import React from 'react'
import Title from 'react-document-title'

import FullPage from '../FullPage'
import UnitedForm from '../UnitedForm'

import styles from './styles'

class LoginPage extends React.Component {
  render() {
    return (
      <Title title="Login - Ripple">
        <FullPage background particle>
          <div className={styles.wrapper}>
            <div className={styles.logo}>

            </div>
            <div className={styles.form}>
              <UnitedForm />
            </div>
          </div>
        </FullPage>
      </Title>
    )
  }
}

export default LoginPage
