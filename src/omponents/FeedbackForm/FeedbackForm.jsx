import React, { useState } from 'react';
import Statistics from '../Statistics';
import FeedbackOptions from '../FeedbackOptions';
import Section from '../Section';
import Notification from '../Notification';

function FeedbackForm() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const leaveFeedback = e => {
    const { textContent } = e.target;

    switch (textContent) {
      case 'Good':
        setGood(prevState => prevState + 1);
        break;
      case 'Neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'Bad':
        setBad(prevState => prevState + 1);
        break;
      default:
        console.log('Ups');
    }
  };

  const countTotalFeedback = () => good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    if (countTotalFeedback() !== 0) {
      return Math.round((good / countTotalFeedback()) * 100);
    }
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['Good', 'Neutral', 'Bad']}
          onLeaveFeedback={leaveFeedback}
        />
      </Section>
      {countTotalFeedback() !== 0 ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          ></Statistics>
        </Section>
      ) : (
        <Notification message="There is no feedback"></Notification>
      )}
    </>
  );
}

export default FeedbackForm;
