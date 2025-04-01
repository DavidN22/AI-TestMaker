export const promptSchema = `{
  "questions": [
    {
      "question_number": 1,
      "question": "What is the purpose of Amazon S3?",
      "answers": {
        "a": "Compute service",
        "b": "Object storage service",
        "c": "Relational database",
        "d": "Monitoring tool"
      },
      "correct_answer": ["b"],
      "hint": "It's designed for storing and retrieving any amount of data.",
      "explanation": "Amazon S3 is an object storage service used for storing and retrieving data."
    },
    {
      "question_number": 2,
      "question": "AWS Lambda is a type of serverless compute service. True or False?",
      "answers": {
        "a": "True",
        "b": "False"
      },
      "correct_answer": ["a"],
      "hint": "It's commonly used to run code without provisioning servers.",
      "explanation": "AWS Lambda is a serverless compute service that runs your code in response to events."
    },
    {
      "question_number": 3,
      "question": "Which two AWS services are commonly used for serverless applications?",
      "answers": {
        "a": "Amazon EC2",
        "b": "AWS Lambda",
        "c": "Amazon RDS",
        "d": "Amazon S3",
        "e": "Amazon Route 53"
      },
      "correct_answer": ["b", "d"],
      "select_two": true,
      "hint": "One handles compute, the other handles storage.",
      "explanation": "AWS Lambda and Amazon S3 are often used together in serverless applications."
    }
  ]
}`;
