import { IPerson } from '../../../interfaces/interfaces';

export default function createTextInfo(personInfo: IPerson): HTMLParagraphElement {
  const elem = document.createElement('p');
  elem.classList.add('person__info-content');
  const info = document.createElement('pre');
  const link = document.createElement('a');
  link.target = '_blank';
  link.href = personInfo.github;
  link.textContent = ` ${link}`;
  info.textContent = `  const ${personInfo.nickname} = {
    name: ${personInfo.name},
    role: ${personInfo.role},
    bio: ${personInfo.bio},
    github:`;
  const additionalText = document.createElement('pre');
  additionalText.textContent = '  }';
  info.append(link, additionalText);
  elem.append(info);
  return elem;
}
