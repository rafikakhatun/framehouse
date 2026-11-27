import heroCollage from '../assets/hero-poster-collage.jpeg'
import afterTheSignal from '../assets/after-the-signal.jpeg'
import theLastCoast from '../assets/the-last-coast.jpeg'
import velvetHours from '../assets/velvet-hours.jpeg'
import wildMeridian from '../assets/wild-meridian.jpeg'
import glassCity from '../assets/glass-city.jpeg'
import emberSeason from '../assets/ember-season.jpeg'

export const titles = [
  { title: 'After the Signal', genre: 'Sci-fi thriller', year: '2026', tone: 'violet', src: afterTheSignal, preview: import.meta.env.BASE_URL + 'videos/after-the-signal-preview.mp4?v=with-soundtrack', alt: 'A radio technician beside a receiver lit by blue monitors and a red warning light', synopsis: 'A radio technician intercepts a distress call from an abandoned tower. The voice on the recording is her own, and the transmission is dated tomorrow.' },
  { title: 'The Last Coast', genre: 'Adventure', year: '2025', tone: 'teal', src: theLastCoast, preview: import.meta.env.BASE_URL + 'videos/the-last-coast-preview.mp4', alt: 'An explorer in a yellow raincoat holds a map above a stormy coast and a shipwreck', synopsis: 'An explorer follows a hand-drawn map along an uncharted coast, racing the tide to find the last traces of a vanished expedition.' },
  { title: 'Velvet Hours', genre: 'Drama', year: '2026', tone: 'rose', src: velvetHours, alt: 'Two friends talk beside a rain-streaked diner window lit by pink neon', synopsis: 'Over one rainy night in a closing diner, two estranged friends try to decide what to say before the first train out of town.' },
  { title: 'Wild Meridian', genre: 'Documentary', year: '2025', tone: 'amber', src: wildMeridian, alt: 'An ibex stands on an alpine ledge at sunrise', synopsis: 'Follow a high-altitude trail across a remote mountain range and discover how wildlife adapts as the seasons change.' },
  { title: 'Glass City', genre: 'Mystery', year: '2026', tone: 'blue', src: glassCity, alt: 'A photographer sees a hooded stranger reflected in a rain-streaked window', synopsis: 'A night-shift photographer notices a stranger in the city’s reflections. The stranger keeps appearing, even on streets the photographer has never visited.' },
  { title: 'Ember Season', genre: 'Drama', year: '2025', tone: 'rose', src: emberSeason, alt: 'A woman holds an old key outside a farmhouse at sunset', synopsis: 'A woman returns to her family farmhouse to prepare it for sale. An unexpected visitor forces her to revisit the summer she left.' },
]
 
export const featured = {
  ...titles[0],
  src: heroCollage,
  alt: 'A diagonal collage of movie and TV series posters',
}

export const questions = [
  ['What is Framehouse?', 'Framehouse is a portfolio project for exploring a cinematic streaming interface. The titles in this preview are fictional.'],
  ['Can I stream or download titles yet?', 'This preview lets you explore the catalog layout. Playback and downloads are currently unavailable.'],
  ['Where can I browse?', 'Open the preview on a phone, tablet, or computer. The layout adapts to your screen.'],
  ['Can I create an account?', 'Yes. Create an account with your email and password, or continue with Google to browse the collection.'],
]
