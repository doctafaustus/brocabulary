import styles from '/components/quiz/progress/progress.module.scss';


export default function Progress({ progress, game, getResultClass }) {
  return (
    <div className={styles['progress-container']}>
      <progress max="100" value={progress.completion}></progress>
      <div className="progress-notches">
        {game.results.map((item, i) => 
          <div className={`notch ${getResultClass(item)}`} key={i}></div>
        )}
      </div>
    </div>
  );
}