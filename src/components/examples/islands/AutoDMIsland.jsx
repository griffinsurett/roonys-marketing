import AnimatedExample from '../AnimatedExample.jsx';
import AutoDMExample from '../AutoDMExample.jsx';

export default function AutoDMIsland() {
  return (
    <AnimatedExample label="Comment trigger automation sending instant DMs">
      {(isActive) => <AutoDMExample isActive={isActive} />}
    </AnimatedExample>
  );
}
