



export const quizzes = {
  'quiz-wd-1': {
    id: 'quiz-wd-1',
    title: 'HTML Basics Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What does HTML stand for?',
        options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language'],
        correctAnswer: 'Hyper Text Markup Language',
      },
    ],
  },
  'quiz-wd-2': {
    id: 'quiz-wd-2',
    title: 'CSS Basics Quiz',
    questions: [
      {
        id: 'q2',
        question: 'What is the correct CSS syntax for making all the <p> elements bold?',
        options: ['p {font-weight:bold;}', '<p style="font-weight:bold;">', 'p {text-size:bold;}'],
        correctAnswer: 'p {font-weight:bold;}',
      },
    ],
  },
   'quiz-ds-1': {
    id: 'quiz-ds-1',
    title: 'Python Variables Quiz',
    questions: [
      {
        id: 'q3',
        question: 'Which is the correct way to declare a variable in Python?',
        options: ['let x = 5', 'x = 5', 'var x = 5'],
        correctAnswer: 'x = 5',
      },
    ],
  },
  'quiz-react-1': {
      id: 'quiz-react-1',
      title: 'React Hooks Quiz',
      questions: [
          {
              id: 'q4',
              question: 'Which Hook would you use to store a value that persists between renders?',
              options: ['useEffect', 'useState', 'useRef'],
              correctAnswer: 'useState'
          }
      ]
  }
};

export const getQuiz = (id) => {
    return quizzes[id] || null;
}

export const saveQuiz = (quizData) => {
    if (!quizData.id) {
        quizData.id = `quiz-${Date.now()}`;
    }
    quizzes[quizData.id] = quizData;
    return quizData;
};