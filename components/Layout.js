import Navbar from "./Navbar";
import Head from 'next/head';

import styles from "../styles/Layout.module.css";

const Layout = ({children}) => {
  return (
    <>
      <Head>
        <title>uFIT</title>
        <meta name="description" content="Demo fitness app created with NextJS and create-next-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Navbar />
        <div className={styles.childContainer}>
          { children }
        </div>
      </div>
    </>
  );
};

export default Layout;

// inside \pages\_app.js, we imported this Layout file, and had the MyApp component return the following:
// <Layout>
//   <Component {...pageProps} />   <-- this is where all the page components will be rendering
// </Layout>
// ergo, Layout has access to props.children, which we destruc as ({ children }) above
// and wherever inside <Layout> we decide to put {children}, that's where all the page components will wind up
