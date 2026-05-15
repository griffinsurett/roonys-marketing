import AnimatedExample from '../AnimatedExample.jsx';
import OnePlatformExample from '../OnePlatformExample.jsx';

export default function OnePlatformIsland() {
  return (
    <AnimatedExample label="One video posted to TikTok, Instagram Reels, and YouTube Shorts">
      {(isActive) => <OnePlatformExample isActive={isActive} />}
    </AnimatedExample>
  );
}
