import { IPerson } from '../../../interfaces/interfaces';

export default function createTextInfo(personInfo: IPerson): HTMLParagraphElement {
  const elem = document.createElement('p');
  elem.classList.add('person__info-content');
  const info = document.createElement('pre');
  const link = document.createElement('a');
  link.href = personInfo.github;
  link.textContent = personInfo.github;
  info.innerHTML = `  const ${personInfo.nickname} = {
    name: ${personInfo.name},
    role: ${personInfo.role},
    bio: ${personInfo.bio},
    github: ${link}
  }`;
  elem.append(info);
  return elem;
}
