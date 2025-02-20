import styles from "./PatternCard.module.scss";
import { IPattern } from "types/IPattern";

export const PatternCard = ({
  title,
  link,
  component,
  description,
}: IPattern) => {
  return (
    <li className={styles.pattern}>
      <div className={styles.patternTitle}>
        <a href={link}>{title}</a>
      </div>
      <div className={styles.patternComponent}>{component}</div>
      <div className={styles.patternDescription}>{description}</div>
    </li>
  );
};
