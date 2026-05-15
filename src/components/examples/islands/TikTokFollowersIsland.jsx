import AnimatedExample from '../AnimatedExample.jsx';
import TikTokFollowersExample from '../TikTokFollowersExample.jsx';

export default function TikTokFollowersIsland() {
  return (
    <AnimatedExample label="TikTok inbox showing a flood of new followers">
      {(isActive) => <TikTokFollowersExample isActive={isActive} />}
    </AnimatedExample>
  );
}
