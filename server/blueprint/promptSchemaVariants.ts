export const promptSchemaMultipleChoice = `{
  "questions": [
    {
      "question_number": 1,
      "question": "What is the capital of France?",
      "answers": {
        "a": "Berlin",
        "b": "Madrid",
        "c": "Paris",
        "d": "Rome"
      },
      "correct_answer": ["c"],
      "hint": "It's known as the city of lights.",
      "explanation": "Paris is the capital of France."
    }
  ]
}`;

export const promptSchemaSelectTwo = `{
  "questions": [
    {
      "question_number": 1,
      "question": "Select two prime numbers.",
      "answers": {
        "a": "4",
        "b": "5",
        "c": "7",
        "d": "8",
        "e": "9"
      },
      "correct_answer": ["b", "c"],
      "select_two": true,
      "hint": "Prime numbers are only divisible by 1 and themselves.",
      "explanation": "5 and 7 are prime numbers."
    }
  ]
}`;

export const promptSchemaTrueFalse = `{
  "questions": [
    {
      "question_number": 1,
      "question": "The sky is blue. True or False?",
      "answers": {
        "a": "True",
        "b": "False"
      },
      "correct_answer": ["a"],
      "hint": "Look up on a clear day.",
      "explanation": "The sky appears blue due to Rayleigh scattering."
    }
  ]
}`;
