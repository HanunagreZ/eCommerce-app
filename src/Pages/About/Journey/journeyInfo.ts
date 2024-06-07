export const journeyInfo: string = `We are a team of three hobbits who are carrying the javascript ring into the volcano of future work. 
The first hobbit was organizing the project. Layouts, names, sequence and priority of work. 
The second hobbit laid out the paths. Every step of the journey remains in history.
The third hobbit became a master of communicating with the API. She also always came to the rescue and was on duty at night.`;

export const journeyObstacles: string =
  'On our journey, we encountered obstacles in the form of bugs in the code, incorrect sequencing of asynchronous code and reviewers 1.';

export const journeyHelp: string = `However, time after time, through joint efforts, we solved problems and moved on!
Also on our journey there was the magical support of the wise elders from the school.`;

export const journeyResult: string = "After 19 weeks we've arrived! And there are still many adventures ahead!";
export const journeyOffer: string = 'If you want to go on such a journey, join the school. Everyone is welcome here!';

export const hobbitsImgs = [
  './../../../assets/about/hobbits1.png',
  './../../../assets/about/hobbits2.png',
  './../../../assets/about/hobbits3.png',
];
export const enemyImgs = [
  './../../../assets/about/enemy1.png',
  './../../../assets/about/enemy2.png',
  './../../../assets/about/enemy3.png',
];
export const helpersImgs = ['./../../../assets/about/support1.png', './../../../assets/about/support2.png'];
export const pathImgs = [
  './../../../assets/about/goal1.png',
  './../../../assets/about/goal2.png',
  './../../../assets/about/goal3.png',
];

export function createJourneyText(text: string, classList: string): HTMLParagraphElement {
  const elem = document.createElement('p');
  elem.classList.add(classList);
  elem.textContent = text;
  return elem;
}
