function reversePolish(tokens) {
  const validate = validateInput(tokens);
  if (!validate) return 0;
  let stack = [];
  if (tokens === "") {
    return 0;
  }

  for (let i = 0; i < tokens.length; i++) {
    if (!isNaN(tokens[i]) && isFinite(tokens[i])) {
      stack.push(tokens[i]);
    } else {
      let a = stack.pop();
      let b = stack.pop();
      switch (tokens[i]) {
        case "+":
          stack.push(parseInt(a) + parseInt(b));
          break;

        case "-":
          stack.push(parseInt(a) - parseInt(b));
          break;
        case "*":
          stack.push(parseInt(a) * parseInt(b));
          break;

        default:
          stack.push(parseInt(b) / parseInt(a));
          break;
      }
    }
  }

  if (stack.length > 1) {
    return "ERROR";
  } else {
    return stack[0];
  }
}

function validateInput(inputs) {
  if (inputs.length < 1 || inputs.length > 104) return false;
  if (
    inputs.some((input) => input > 200) ||
    inputs.some((input) => input < -200)
  )
    return false;

  return true;
}

const tokens = ["4", "2", "+", "5", "*"];
const tokens1 = ["4", "13", "5", "/", "+"];
const token2 = ["-10","-2000", "+"];
console.log(reversePolish(tokens1));
