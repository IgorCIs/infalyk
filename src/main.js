import './assets/styles/app.sass';
import Trigger from './assets/scripts/trigger';
import Popups from './assets/scripts/popup';
import HomepageSlider from './components/homepage__slider';
import Applications from './components/applications';
import HomepageBanner from './components/banner';
import SameHeight from './assets/scripts/sameHeight';
import FeaturesSlider from './components/decorative-list/infravieu__features'
import Header from './components/header'

document.addEventListener("DOMContentLoaded", () => {
  SameHeight()
  Trigger()
  HomepageSlider()
  FeaturesSlider()
  Applications()
  Header()
  // HomepageBanner()
  

  new Popups()
})