import "./BudgetProgressBar.css";

export const BudgetProgressBar = ({ current, goal }) => {
  let percent;
  let progressBarClass;
  let displayText;
  

  if (goal === 0) {
    percent = 'N/A';
    progressBarClass = 'progress progress-na';
    displayText = "We Don't Need Money!"
  } else {
    percent = Math.floor((current / goal) * 100);
    progressBarClass = `progress progress-${percent}`;
    displayText = `${percent}% Saved`
  }

  return (
    <div className="progress-bar">
      <div className={progressBarClass}></div>
      <div className="centered-text">{displayText}</div>
    </div>
  );
};
