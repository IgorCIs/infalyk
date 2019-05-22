import './assets/styles/app.sass';
import Trigger from './assets/scripts/trigger';
import Popups from './assets/scripts/lib/popup';
import HomepageSlider from './components/homepage__slider';
import Applications from './components/applications';
import HomepageBanner from './components/banner';
import SameHeight from './assets/scripts/sameHeight';
import FeaturesSlider from './components/decorative-list/infravieu__features'
import Header from './components/header'
import DronePilotSlider from './components/decorative-list/drone__pilot-features';
import DroneClientSlider from './components/decorative-list/drone__client-features';
import AnimateNode from './assets/scripts/animateNode';
import Loader from './assets/scripts/loader';
import Cocoen from 'cocoen'
import HomepageDataSource from './components/decorative-list/homepage__data-source'
import LidarViewer from './components/banner/LidarViewer';
const isLidar = document.querySelector('#lidar-viewer')


document.addEventListener("DOMContentLoaded", () => {
  SameHeight()
  DronePilotSlider()
  LidarViewer(() => {
    AnimateNode() 
    Loader()
  })
  if(!isLidar) {
    Loader()
    AnimateNode() 
  }
  DroneClientSlider()
  Trigger()
  HomepageSlider()
  FeaturesSlider()
  Applications()
  Header()
  HomepageBanner()
  HomepageDataSource()
  if(document.querySelector('.cocoen')) new Cocoen(document.querySelector('.cocoen'))
  new Popups()
})