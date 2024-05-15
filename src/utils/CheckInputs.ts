import InputField from '../components/InputField/InputField';
import { registrationError } from '../pages/Registration/Registration';

export function CheckInputs(inputFields: InputField[]): boolean {
  let isAllValid = true;
  inputFields?.forEach((element) => {
    const isElementValid = element.checkValidation(element.reg);
    if (!isElementValid && registrationError.count === 0) {
      element.get().scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
      registrationError.count = 1;
    }
    isAllValid &&= isElementValid;
    element.input.removeListener(() => element.checkValidation(element.reg));
    element.input.addListener(() => element.checkValidation(element.reg));
  });

  return isAllValid;
}
