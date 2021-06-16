
// import Image from 'next/image';
// <Image src="/images/timer-2.png" width={50} height={50}/>
import Link from "next/link";
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.mainCard}>
      <h1 className={styles.appTitle}>HIITrainer</h1>
      <p className={styles.appSubtitle}>3-in-1 High Intensity Interval Training App</p>

      <div className={styles.optionCard}>
        <Link href="/timer">
          <a>
            <h3>Workout Timer</h3>
            <div className={styles.imgBG}>
              <i className="fas fa-stopwatch"></i>
            </div>
          </a>
        </Link>
      </div>

      <div className={styles.optionCard}>
        <Link href="/builder">
          <a>
            <h3>Routine Builder</h3>
            <div className={styles.imgBG}>
              <i className="fas fa-pen-square"></i>
            </div>
          </a>
        </Link>
      </div>

      <div className={styles.optionCard}>
        <Link href="/tracker">
          <a>
            <h3>Daily Tracker</h3>
            <div className={styles.imgBG}>
              <i className="fas fa-calendar-day"></i>
            </div>
          </a>
        </Link>
      </div>

    </div>
  )
};

// workout timer
// routine builder
// daily tracker

// <main className={styles.main}>
//   <h1 className={styles.title}>
//     Welcome to <a href="https://nextjs.org">Next.js!</a>
//   </h1>
//
//   <p className={styles.description}>
//     Get started by editing{' '}
//     <code className={styles.code}>pages/index.js</code>
//   </p>
//
//   <div className={styles.grid}>
//     <a href="https://nextjs.org/docs" className={styles.card}>
//       <h2>Documentation &rarr;</h2>
//       <p>Find in-depth information about Next.js features and API.</p>
//     </a>
//
//     <a href="https://nextjs.org/learn" className={styles.card}>
//       <h2>Learn &rarr;</h2>
//       <p>Learn about Next.js in an interactive course with quizzes!</p>
//     </a>
//
//     <a
//       href="https://github.com/vercel/next.js/tree/master/examples"
//       className={styles.card}
//     >
//       <h2>Examples &rarr;</h2>
//       <p>Discover and deploy boilerplate example Next.js projects.</p>
//     </a>
//
//     <a
//       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//       className={styles.card}
//     >
//       <h2>Deploy &rarr;</h2>
//       <p>
//         Instantly deploy your Next.js site to a public URL with Vercel.
//       </p>
//     </a>
//   </div>
// </main>
//
// <footer className={styles.footer}>
//   <a
//     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     Powered by{' '}
//     <span className={styles.logo}>
//       <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//     </span>
//   </a>
// </footer>
