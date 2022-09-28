// React Module Imports
import { useState } from 'react'

// Next Module Imports
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { setCookies } from 'cookies-next';

// Prime React Imports
import { Password } from 'primereact/password';

// 3rd Party Imports
import * as yup from 'yup';
import { ErrorMessage, Formik, Field, FormikHelpers } from 'formik';
import { ToastContainer } from "react-toastify";

// Style and Component Imports
import Logo from '../../public/images/auth_logo.svg'
import styles from '../../styles/Auth.module.scss'
import Layout from '../../components/layout'
import { withAuthSync } from '../../utils/auth'

// Interface/Helper Imports
import service from '../../helper/api/api';

interface Values {
  email: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [authSpinner, setAuthSpinner] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string().required('Please enter email').email("Please enter valid email"),
    password: yup.string().required('Please enter password')
  });

  // LoginSubmitHandler
  const LoginSubmitHandler = async (userData: any) => {
    try {
      setAuthSpinner(true)

      const { data } = await service({
        url: `${process.env.API_BASE_URL}/user/login`,
        method: 'POST',
        data: userData,
        headers: { 'Content-Type': 'application/json' }
      });
      if (data.status != 200) {
        setErrorMessage(data.message)
        return setAuthSpinner(false)
      }
      let setUser = Date.now() + JSON.parse(userData).email;
      window.localStorage.setItem('loginUserdata', JSON.stringify(data.data[0].user));
      window.localStorage.setItem('authToken', JSON.stringify(data.data[0].token));
      await window.localStorage.setItem('ValidUser', setUser);
      await setCookies('ValidUser', setUser);
      setErrorMessage('')
      setAuthSpinner(false)
      router.push('/');

    } catch (err: any) {
      setErrorMessage(err.message)
      setAuthSpinner(false);
    }
  }

  return (
    <Layout header={false}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.logoBox}>
        <div className={styles.logo}>
          <Image
            src={Logo}
            alt="Dataplus"
            width={198}
            height={48}
          />
        </div>
      </div>
      <div className={styles.authContainer + " " + styles.login}>
        <div className={styles.formContainer}>
          <div className={styles.textBox}>
            <h1>
              Get all the power, with an Absolute Free Trial.
            </h1>
            <p>No credit cards beyond this point. It’s a 14-day free trip to Sibera, so just enjoy.</p>
          </div>
          <div className={styles.authBox}>
            <div className={styles.authForm}>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(
                  values: Values,
                  { setSubmitting }: FormikHelpers<Values>
                ) => {
                  LoginSubmitHandler(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }}
              >
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    {
                      authSpinner ? <div className={styles.formSpinner}>
                        <div className={styles.loading}></div>
                      </div> : null
                    }
                    <div className={styles.titleBox}>
                      <h3>Sign In to Dataplus</h3>
                      <p>
                        New Here?
                        <Link href="/auth/signup">
                          <a> Create an Account</a>
                        </Link>
                      </p>
                    </div>
                    <div className={styles.inputBox}>
                      <label htmlFor="email">Email</label>
                      <Field type="email" name="email" />
                      <ErrorMessage name="email">
                        {(msg) => <p className={styles.error}>{msg}</p>}
                      </ErrorMessage>
                    </div>

                    <div className={styles.inputBox}>
                      <label htmlFor="password">
                        Password
                        <Link href="/auth/forgotpassword">
                          <a>Forgot Password ?</a>
                        </Link>
                      </label>
                      <Field name="password">
                        {({ field }: any) => (
                          <Password {...field} toggleMask feedback={false} />
                        )}
                      </Field>
                      <ErrorMessage name="password">
                        {(msg) => <p className={styles.error}>{msg}</p>}
                      </ErrorMessage>

                    </div>
                    {
                      errorMessage ? <p className={styles.formError + " p-mt-0"}>{errorMessage}</p> : null
                    }
                    <button type="submit">Login</button>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className={styles.waveBg}>
          <svg className={styles.waves} xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className={styles.parallax}>
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </Layout>
  )
}

export default withAuthSync(Login)
