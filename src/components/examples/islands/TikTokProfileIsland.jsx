import AnimatedExample from '../AnimatedExample.jsx';
import TikTokProfileExample from '../TikTokProfileExample.jsx';

export default function TikTokProfileIsland() {
  return (
    <AnimatedExample label="TikTok profile showing videos with millions of views">
      {(isActive) => <TikTokProfileExample isActive={isActive} />}
    </AnimatedExample>
  );
}
