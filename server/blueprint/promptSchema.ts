export const promptSchema = `{
  "questions": [
    {
      "question": "QUESTION_TEXT",
      "answers": {
        "a": "OPTION_A",
        "b": "OPTION_B",
        "c": "OPTION_C",
        "d": "OPTION_D"
      },
      "correct_answer": ["CORRECT_ANSWER"],
      "hint": "HINT_TEXT",
      "explanation": "EXPLANATION_TEXT"
    },
    {
      "question": "QUESTION_TEXT",
      "answers": {
        "a": "OPTION_A",
        "b": "OPTION_B",
        "c": "OPTION_C",
        "d": "OPTION_D",
        "e": "OPTION_E"
      },
      "correct_answer": ["CORRECT_ANSWER_1", "CORRECT_ANSWER_2"],
      "select_two": true,
      "hint": "HINT_TEXT",
      "explanation": "EXPLANATION_TEXT"
    }
  ]
}
`