import AnimatedExample from '../AnimatedExample.jsx';
import AudienceQualityExample from '../AudienceQualityExample.jsx';

export default function AudienceQualityIsland() {
  return (
    <AnimatedExample label="Audience quality dashboard comparing a large disengaged account vs a small high-quality niche audience">
      {(isActive) => <AudienceQualityExample isActive={isActive} />}
    </AnimatedExample>
  );
}
