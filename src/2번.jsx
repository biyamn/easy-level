// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
  const DIGIT = "5";
  let positiveN = 0;
  let sign = 1;
  let NArray = [];
  if (N >= 0) {
    positiveN = N;
    NArray = [...String(positiveN)];
  } else {
    sign = -1;
    positiveN = Math.abs(N);
    NArray = [...String(positiveN)];
  }

  const getIndex = (NArray) => {
    for (let i = 0; i < NArray.length; i++) {
      if (sign === 1) {
        if (DIGIT >= NArray[i]) {
          return i;
        }
      } else {
        if (DIGIT <= NArray[i]) {
          return i;
        }
      }
    }
  };

  const INDEX = getIndex(NArray);

  const newArray = [...NArray.slice(0, INDEX), DIGIT, ...NArray.slice(INDEX)];

  const joinedNewArray = newArray.join("");
  const result = sign * Number(joinedNewArray);
  return result;
}

// 50
// 450
// -12345
// -76543
// -346
// -54321 // 틀림
// -56321
// -5556555
// -5553555 // 틀림

// 550
// 5450
// -123455
// -576543
// -3456
// -543215(예상) // -554321(결과)
// -556321
// -55556555
// -55535555(예상) // -55553555(결과)
