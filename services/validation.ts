export const isNameValid = (name: string) => {
  if (name.length > 5 && name.length < 20) {
    return true;
  }

  return false;
}

export const isAgeValid = (age: string) => {
  const ageNumber = Number(age);

  if (ageNumber > 8 && ageNumber < 50) {
    return true;
  }

  return false;
};

export const isHeightValid = (height: string) => {
    const heightNumber = Number(height);

    if (heightNumber > 120 && heightNumber < 200) {
        return true;
    }

    return false;
}

export const isWeightValid = (weight: string) => {
    const weightNumber = Number(weight);

    if (weightNumber > 40 && weightNumber < 140) {
        return true;
    }

    return false;
}