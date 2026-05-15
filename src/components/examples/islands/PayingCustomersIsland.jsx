import AnimatedExample from '../AnimatedExample.jsx';
import PhoneCarousel from '../PhoneCarousel.jsx';
import TikTokShopExample from '../TikTokShopExample.jsx';
import InstagramDMExample from '../InstagramDMExample.jsx';

export default function PayingCustomersIsland() {
  return (
    <AnimatedExample label="TikTok Shop and Instagram DMs from potential customers">
      {(isActive) => (
        <PhoneCarousel holdMs={5000} transMs={600}>
          <TikTokShopExample isActive={isActive} />
          <InstagramDMExample isActive={isActive} />
        </PhoneCarousel>
      )}
    </AnimatedExample>
  );
}
