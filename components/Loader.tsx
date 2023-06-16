import styles from '../styles/Loader.module.css'
import Image from 'next/image'
import { FaWhatsapp } from 'react-icons/fa';

export default function Loader() {
  return (
    <div className={styles["main-loader"]}>
      <div className={styles["loader"]}>
        <div className={styles["logo-loader"]}>
          <Image
            className="flex justify-center w-28 h-28 items-center animate-pulse"
            src="/Frame7.svg"
            width={64}
            height={64}
            alt="rudra"
          />
          <style jsx>{`
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
  }

  .animate-pulse {
    animation: pulse 2s infinite;
  }
`}</style>
          <div className={styles["load-circle"]}></div>
        </div>
      </div>
    </div>
  );
}
