import AnimatedExample from '../AnimatedExample.jsx';
import SleepIncomeExample from '../SleepIncomeExample.jsx';

export default function SleepIncomeIsland() {
  return (
    <AnimatedExample label="Notifications and revenue rolling in overnight while you sleep">
      {(isActive) => <SleepIncomeExample isActive={isActive} />}
    </AnimatedExample>
  );
}
