



export const courses = {
  'wd-bootcamp': {
    id: 'wd-bootcamp',
    title: 'The Complete 2024 Web Development Bootcamp',
    description: 'Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps.',
    authorId: 'system',
    videos: [
      { id: 'v1', title: 'Introduction to HTML', duration: '15:30', videoUrl: 'placeholder.mp4', quizId: 'quiz-wd-1', resources: ['HTML_Cheatsheet.pdf'] },
      { id: 'v2', title: 'Styling with CSS', duration: '25:10', videoUrl: 'placeholder.mp4', quizId: 'quiz-wd-2', resources: ['CSS_Selectors.pdf'] },
      { id: 'v3', title: 'JavaScript Fundamentals', duration: '45:00', videoUrl: 'placeholder.mp4', quizId: 'quiz-wd-1', resources: [] },
    ],
    createdAt: '2023-01-10',
    views: 152345,
    enrolledCount: 12876,
    revenue: 373404,
    price: 99.99,
    category: 'Web Development',
    thumbnailUrl: 'https://img-c.udemycdn.com/course/750x422/4505104_8592_8.jpg',
  },
  'ds-python': {
    id: 'ds-python',
    title: 'Python for Data Science and Machine Learning',
    description: 'Learn Python for Data Science and Machine Learning from A-Z. Scikit-Learn, Pandas, Matplotlib, Seaborn and more!',
    authorId: 'system',
    videos: [
      { id: 'v4', title: 'Python Setup', duration: '12:00', videoUrl: 'placeholder.mp4', quizId: 'quiz-ds-1', resources: ['Python_Basics.pdf', 'Pandas_Intro.pdf'] },
      { id: 'v5', title: 'Variables and Data Types', duration: '22:45', videoUrl: 'placeholder.mp4', quizId: 'quiz-ds-1', resources: [] },
    ],
    createdAt: '2023-02-20',
    views: 98765,
    enrolledCount: 8123,
    revenue: 194952,
    price: 84.99,
    category: 'Data Science',
    thumbnailUrl: 'https://bitm.org.bd/storage/thumbnail/qnSlwfktBP21mkGsWpVWBLU6mksgC5DkKmgLVJKJ.jpg',
  },
  'teacher-course-1': {
    id: 'teacher-course-1',
    title: 'Advanced React Patterns',
    description: 'A deep dive into advanced patterns for scalable and maintainable React applications.',
    authorId: '2', // Bob Teacher's ID
    videos: [
        { id: 'v6', title: 'Render Props', duration: '18:20', videoUrl: 'placeholder.mp4', quizId: 'quiz-react-1', resources: ['RenderProps_Guide.pdf'] },
        { id: 'v7', title: 'Higher-Order Components', duration: '24:00', videoUrl: 'placeholder.mp4', quizId: 'quiz-react-1', resources: [] },
    ],
    createdAt: '2024-05-15',
    views: 5420,
    enrolledCount: 450,
    revenue: 8550,
    price: 49.99,
    category: 'Web Development',
    thumbnailUrl: 'https://repository-images.githubusercontent.com/170207515/60f16512-b5f5-40f9-a193-913161f7bf10',
  }
};

export const getAllCourses = () => {
    return Object.values(courses);
};

export const getCourse = (id) => {
    return courses[id] || null;
};

export const saveCourse = (courseData) => {
    const courseId = courseData.id || `course-${Date.now()}`;
    if (!courseData.id) {
        courseData.id = courseId;
        courseData.createdAt = new Date().toISOString().split('T')[0];
        courseData.views = 0;
        courseData.enrolledCount = 0;
        courseData.revenue = 0;
    }
    courses[courseId] = {
        ...courses[courseId], // preserve existing data like views, etc.
        ...courseData,
        thumbnailUrl: courseData.thumbnailUrl || `https://picsum.photos/seed/${courseId}/500/300`
    };
    return courseData;
};

export const deleteCourse = (id) => {
    if (courses[id]) {
        delete courses[id];
        return true;
    }
    return false;
};