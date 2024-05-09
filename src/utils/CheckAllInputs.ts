import InputField from '../components/InputField/InputField';

export function CheckAllInputs(inputFields: InputField[]): boolean {
  let isAllValid = true;
  inputFields?.forEach((element) => {
    const isElementValid = element.checkValidation(element.reg);
    isAllValid &&= isElementValid;
    element.input.removeListener(() => element.checkValidation(element.reg));
    element.input.addListener(() => element.checkValidation(element.reg));
  });

  return isAllValid;
}
