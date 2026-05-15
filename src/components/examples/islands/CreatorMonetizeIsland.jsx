import AnimatedExample from '../AnimatedExample.jsx';
import CreatorMonetizeExample from '../CreatorMonetizeExample.jsx';

export default function CreatorMonetizeIsland() {
  return (
    <AnimatedExample label="TikTok Live gifts, creator fund earnings, and Instagram brand deal DM">
      {(isActive) => <CreatorMonetizeExample isActive={isActive} />}
    </AnimatedExample>
  );
}
