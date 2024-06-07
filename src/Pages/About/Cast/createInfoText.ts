import { IPerson } from '../../../interfaces/interfaces';

export default function createTextInfo(personInfo: IPerson): HTMLParagraphElement {
  const elem = document.createElement('p');
  elem.classList.add('person__info-content');
  const info = document.createElement('pre');
  info.textContent = `const ${personInfo.nickname} = {
        name: ${personInfo.name},
        role: ${personInfo.role},
        bio: ${personInfo.bio},
        github: ${personInfo.github} 
    }`;
  elem.append(info);
  return elem;
}
