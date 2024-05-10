// const input = document.querySelectorAll('.js-date')[0];

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function FormatDate(input: HTMLInputElement) {
  input.addEventListener('keypress', (e: KeyboardEvent) => {
    const valueLength = input.value.length;

    if (!digits.includes(e.key) || valueLength >= 10) {
      e.preventDefault();
    }

    if (valueLength !== 1) {
      if (e.key === '.') {
        e.preventDefault();
      }
    }

    if (valueLength !== 3) {
      if (e.key === '.') {
        e.preventDefault();
      }
    }

    if (valueLength === 2) {
      input.value += '.';
    }

    if (valueLength === 5) {
      input.value += '.';
    }
  });
}

// dateInputMask(input);
