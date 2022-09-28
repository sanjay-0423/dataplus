import Head from 'next/head'
import "react-toastify/dist/ReactToastify.css";

const Layout = (props: any) => {
  return <>
    <Head>
      <title>Dataplus</title>
    </Head>

    <main>
      {props.children}
    </main>
  </>
}

export default Layout
