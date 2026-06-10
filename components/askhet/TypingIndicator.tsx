import styles from "./askhet.module.css";

export default function TypingIndicator() {
  return (
    <div role="status" aria-label="AskHet is typing">
      <span className={styles.typing}>
        <span aria-hidden="true">askhet is typing</span>
        <span aria-hidden="true" className={styles.typingDot} />
        <span aria-hidden="true" className={styles.typingDot} />
        <span aria-hidden="true" className={styles.typingDot} />
      </span>
    </div>
  );
}
