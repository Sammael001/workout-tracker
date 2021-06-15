import Link from "next/link";
import Image from "next/image";
// we can import + use images inline by (A) placing them in the \public folder, and (B) placing them like so: <img src="/ninja1.png"/>
// using <Image> component imported from nextJS is better, because A) it requires us to add width and height, B) it makes the img responsive, and C) it automatically includes lazy-loading, which means imgs only load when the browser is displaying them

const Navbar = (props) => {
  return (
    <nav>
      <Link href="/">
        <a className="logo">
          <Image src="/images/icon2.gif" width={50} height={50} />
          {' '}HIITrainer
        </a>
      </Link>
      <Link href="/timer">
        <a>Workout Timer</a>
      </Link>
      <Link href="/builder">
        <a>Routine Builder</a>
      </Link>
      <Link href="/tracker">
        <a>Daily Tracker</a>
      </Link>
    </nav>
  );
};

export default Navbar;
