import AnimatedExample from '../AnimatedExample.jsx';
import AgencyWhiteLabelExample from '../AgencyWhiteLabelExample.jsx';

export default function AgencyWhiteLabelIsland() {
  return (
    <AnimatedExample label="Behind the scenes production pipeline and client-facing branded report">
      {(isActive) => <AgencyWhiteLabelExample isActive={isActive} />}
    </AnimatedExample>
  );
}
