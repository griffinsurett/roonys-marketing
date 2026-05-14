import Button from './Button';
import { ArrowRight, Play } from 'lucide-react';

const HeroButtons = () => (
  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-2">
    <Button variant="primary" href="#portfolio" icon={<ArrowRight className="w-6 h-6" />}>
      Get Started
    </Button>
    <Button variant="secondary" href="#portfolio" icon={<Play className="w-6 h-6" />}>
      Watch Our Reels
    </Button>
  </div>
);

export default HeroButtons;
