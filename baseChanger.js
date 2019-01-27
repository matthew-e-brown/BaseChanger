function divrem(num, den, neg = false) {
  let sign = 1;
  if (neg) {
    sign = ((num < 0 ? !(den < 0) : den < 0)) ? -1 : 1; //simulate xor
    num = Math.abs(num);
    den = Math.abs(den);
  }

  let quot = 0;
  while (num >= den) {
    num -= den;
    quot++;
  }
  return {
    "quotient": sign * quot,
    "remainder": num % den
  }
}

function baseChange(number, fromBase, toBase, showSteps = false) {
  const DIGITORDER = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "+"];
  //For some reason, base 64 represents numbers with letters first, then numbers...
  const DIGITS_SIXTY_FOUR = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-"];

  numString = (typeof number == "string") ? number.replace(/ /g, '').split("").reverse() : number.toString().split("").reverse();
  if (showSteps) console.log(`Reverse ${number}, to work from the start: ${numString}`);
  if (showSteps) console.log(`Convert to decimal (start from zero, add digits in decimal):`);
  let decimal = 0;
  for (let i = 0; i < numString.length; i++) {
    let digit = (fromBase != 64) ? DIGITORDER.indexOf(fromBase <= 35 ? numString[i].toUpperCase() : numString[i]) : DIGITS_SIXTY_FOUR.indexOf(numString[i]);
    if (showSteps) console.log(`${i}: Current Digit: ${(digit >= 10) ? numString[i] + " =" : ""} ${digit}`);
    if (showSteps) console.log(`Add (digit * fromBase ^ digit_place) to ${decimal}: ${digit} * (${fromBase} ** ${i}) = ${Number(digit) * (fromBase ** i)}`);
    decimal += Number(digit) * (fromBase ** i);
  }
  if (showSteps) console.log(`Decimal Output: ${decimal}`);
  if (toBase == 10) return decimal;

  if (showSteps) console.log(`Divide this decimal by ${toBase}, save the quotient. Add the remainder to a list.`);
  let result = "";
  do {
    let division = divrem(decimal, toBase);
    decimal = division['quotient'];
    result += (toBase != 64) ? DIGITORDER[division['remainder']] : DIGITS_SIXTY_FOUR[division['remainder']];
    if (showSteps) console.log(`Quotient: ${decimal}, Remainder: ${division['remainder']}`);
  } while (Math.abs(decimal) > 0);

  if (showSteps) console.log(`Remainder list: ${result.split("")}`);
  if (showSteps) console.log(`Reverse this list (${result.split("")}) to get ${result.split("").reverse().join("")}. This is the output.`);
  result = result.split("").reverse().join("");
  return (toBase <= 10 && Number(result) < Number.MAX_SAFE_INTEGER) ? Number(result) : result;
}
