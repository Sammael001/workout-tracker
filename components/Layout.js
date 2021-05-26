import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";

const Layout = ({children}) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.childContainer}>
        { children }
      </div>
    </div>
  );
};

export default Layout;

// inside \pages\_app.js, we imported this Layout file, and had the MyApp component return the following:
// <Layout>
//   <Component {...pageProps} />   <-- this is where all the page components will be rendering
// </Layout>
// ergo, Layout has access to props.children, which we destruc as ({ children }) above
// and wherever inside <Layout> we decide to put {children}, that's where all the page components will wind up
