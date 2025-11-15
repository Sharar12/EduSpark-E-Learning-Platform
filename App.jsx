import React, { useState, useEffect, useRef } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import LocomotiveScroll from 'locomotive-scroll';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import FeaturedCourses from './components/FeaturedCourses.jsx';
import Testimonials from './components/Testimonials.jsx';
import CTASection from './components/CTASection.jsx';
import Footer from './components/Footer.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import StudentDashboard from './pages/dashboards/StudentDashboard.jsx';
import TeacherDashboard from './pages/dashboards/TeacherDashboard.jsx';
import AdminDashboard from './pages/dashboards/AdminDashboard.jsx';
import CoursePage from './pages/CoursePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import CourseEditor from './pages/CourseEditor.jsx';
import QuizEditor from './pages/QuizEditor.jsx';
import ManageUsersPage from './pages/ManageUsersPage.jsx';
import ManageCoursesPage from './pages/ManageCoursesPage.jsx';
import UserModal from './components/UserModal.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import BrowseCoursesPage from './pages/BrowseCoursesPage.jsx';
import CourseDetailPage from './pages/CourseDetailPage.jsx';
import { updateUser, deleteUser as dbDeleteUser } from './lib/db.js';
import { getCourse, saveCourse, deleteCourse } from './lib/courses.js';
import { getQuiz, saveQuiz } from './lib/quizzes.js';
import { signOut as authSignOut, signUp } from './lib/auth.js';


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [dataVersion, setDataVersion] = useState(0); // Used to force re-render on data changes
  
  // Student Navigation State
  const [selectedCourseId, setSelectedCourseId] = useState(null); // For enrolled courses
  const [viewingCourseId, setViewingCourseId] = useState(null); // For course details page
  const [currentQuizId, setCurrentQuizId] = useState(null);
  
  // Teacher Editor State
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);

  // Admin User Management State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      locomotiveScrollRef.current = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.05, // Adjust this value for scroll smoothness/speed
      });
    }

    return () => {
      locomotiveScrollRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    // Update the scroll container when the page content changes
    if (locomotiveScrollRef.current) {
      const timer = setTimeout(() => {
        locomotiveScrollRef.current?.update();
      }, 500); // Delay to ensure new content is rendered
      return () => clearTimeout(timer);
    }
  }, [currentPage, currentUser, dataVersion]);


  const navigate = (page, targetId) => {
    if (page === 'home' && targetId) {
        if (currentPage !== 'home') {
            setCurrentPage('home');
            // Scroll after page change
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element && locomotiveScrollRef.current) {
                    locomotiveScrollRef.current.scrollTo(element);
                }
            }, 100);
        } else {
            const element = document.getElementById(targetId);
            if (element && locomotiveScrollRef.current) {
                locomotiveScrollRef.current.scrollTo(element);
            }
        }
    } else {
      setCurrentPage(page);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.scrollTo(0, { duration: 0 });
      }
    }
  };

  const handleSignIn = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleSignOut = () => {
    authSignOut();
    setCurrentUser(null);
    setCurrentPage('home');
    setSelectedCourseId(null);
    setCurrentQuizId(null);
    setEditingCourseId(null);
    setEditingQuizId(null);
    setViewingCourseId(null);
  };
  
  // --- Student Actions ---
  const handleNavigateToCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course');
  };
  
  const handleTakeQuiz = (quizId) => {
    setCurrentQuizId(quizId);
    setCurrentPage('quiz');
  };

  const handleBackToCourse = () => {
    setCurrentQuizId(null);
    setCurrentPage('course');
  };
  
  const handleBackToDashboard = () => {
    setSelectedCourseId(null);
    setCurrentQuizId(null);
    setEditingCourseId(null);
    setEditingQuizId(null);
    setViewingCourseId(null);
    setCurrentPage('dashboard');
  };
  
  const handleViewCourseDetail = (courseId) => {
    setViewingCourseId(courseId);
    setCurrentPage('courseDetail');
  };
  
  // --- Teacher Actions ---
  const handleCreateCourse = () => {
    setEditingCourseId(null); // Indicates a new course
    setCurrentPage('courseEditor');
  };

  const handleEditCourse = (courseId) => {
    setEditingCourseId(courseId);
    setCurrentPage('courseEditor');
  };

  const handleDeleteCourse = (courseId) => {
      if (window.confirm('Are you sure you want to delete this course permanently? This action cannot be undone.')) {
          deleteCourse(courseId);
          setDataVersion(v => v + 1); // Trigger re-render
      }
  };
  
  const handleEditQuiz = (quizId) => {
    setEditingQuizId(quizId);
    setCurrentPage('quizEditor');
  };

  const handleBackToCourseEditor = () => {
    setEditingQuizId(null);
    setCurrentPage('courseEditor');
  };

  const handleSaveCourse = (courseData) => {
      saveCourse(courseData);
      handleBackToDashboard();
  };

  const handleSaveQuiz = (quizData) => {
      saveQuiz(quizData);
      handleBackToCourseEditor();
  };

  // --- Admin Actions ---
    const handleNavigateToManageUsers = () => {
        setCurrentPage('manageUsers');
    };

    const handleNavigateToManageCourses = () => {
        setCurrentPage('manageCourses');
    };

    const handleOpenUserModal = (user) => {
        setEditingUser(user);
        setIsUserModalOpen(true);
    };

    const handleCloseUserModal = () => {
        setEditingUser(null);
        setIsUserModalOpen(false);
    };

    const handleSaveUser = (userData) => {
        try {
            if (userData.id) { // Editing existing user
                const { id, ...dataToUpdate } = userData;
                updateUser(id, dataToUpdate);
            } else { // Creating new user
                if (!userData.password) throw new Error("Password is required for new users.");
                signUp({
                    fullName: userData.fullName,
                    email: userData.email,
                    password: userData.password,
                    role: userData.role,
                });
            }
            setDataVersion(v => v + 1);
            handleCloseUserModal();
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    
    const handleDeleteUser = (userId) => {
        if (currentUser?.id === userId) {
            alert("You cannot delete your own account.");
            return;
        }
        if (window.confirm('Are you sure you want to delete this user? This action is permanent.')) {
            dbDeleteUser(userId);
            setDataVersion(v => v + 1);
        }
    };

    // --- Student Shopping Actions ---
    const handleAddToCart = (courseId) => {
        if (!currentUser || currentUser.role !== 'student') {
            navigate('signin');
            return;
        };

        const updatedCart = [...(currentUser.cart || []), courseId];
        const updatedUser = { ...currentUser, cart: updatedCart };

        setCurrentUser(updatedUser);
        updateUser(currentUser.id, { cart: updatedCart });
    };

    const handleRemoveFromCart = (courseId) => {
        if (!currentUser || currentUser.role !== 'student') return;

        const updatedCart = (currentUser.cart || []).filter(id => id !== courseId);
        const updatedUser = { ...currentUser, cart: updatedCart };

        setCurrentUser(updatedUser);
        updateUser(currentUser.id, { cart: updatedCart });
    };

    const handleCheckout = () => {
        if (!currentUser || currentUser.role !== 'student' || !currentUser.cart?.length) return;

        // Add courses to enrolled list
        const newEnrolledIds = [...(currentUser.enrolledCourseIds || []), ...currentUser.cart];
        
        // Update revenue and enrollment count for each course
        currentUser.cart.forEach(courseId => {
            const course = getCourse(courseId);
            if (course) {
                course.enrolledCount += 1;
                course.revenue += course.price;
                saveCourse(course);
            }
        });

        // Update user: add enrolled courses and clear cart
        const updatedUser = { 
            ...currentUser, 
            enrolledCourseIds: Array.from(new Set(newEnrolledIds)), // Remove duplicates
            cart: [] 
        };
        
        setCurrentUser(updatedUser);
        updateUser(currentUser.id, { enrolledCourseIds: updatedUser.enrolledCourseIds, cart: [] });

        alert('Purchase successful! Your new courses are on your dashboard.');
        navigate('dashboard');
    };


  const renderPage = () => {
    // --- Public Views (No User Logged In) ---
    if (!currentUser) {
        switch (currentPage) {
            case 'signup':
                return <SignUp onNavigate={navigate} onSignUp={handleSignIn} />;
            case 'signin':
                return <SignIn onNavigate={navigate} onSignIn={handleSignIn} />;
            case 'browseCourses':
                return <BrowseCoursesPage currentUser={null} onViewCourse={handleViewCourseDetail} onAddToCart={() => navigate('signin')} />;
            case 'courseDetail':
                const courseToView = viewingCourseId ? getCourse(viewingCourseId) : null;
                if (courseToView) {
                    return <CourseDetailPage course={courseToView} currentUser={null} onAddToCart={() => navigate('signin')} onBack={() => navigate('browseCourses')} />;
                }
                setCurrentPage('browseCourses');
                return null;
            case 'home':
            default:
                return (
                    <>
                        <Hero onNavigate={navigate} />
                        <Features />
                        <FeaturedCourses currentUser={null} onAddToCart={() => navigate('signin')} onViewCourse={handleViewCourseDetail} />
                        <Testimonials />
                        <CTASection onNavigate={navigate} />
                    </>
                );
        }
    }

    // --- Authenticated User Views ---
    switch (currentPage) {
        case 'home':
             return (
                <>
                    <Hero onNavigate={navigate} currentUser={currentUser} />
                    <Features />
                    <FeaturedCourses currentUser={currentUser} onAddToCart={handleAddToCart} onViewCourse={handleViewCourseDetail} />
                    <Testimonials />
                    <CTASection onNavigate={navigate} />
                </>
            );
        case 'browseCourses':
            if(currentUser.role === 'student') {
                return <BrowseCoursesPage currentUser={currentUser} onViewCourse={handleViewCourseDetail} onAddToCart={handleAddToCart} />;
            }
            setCurrentPage('dashboard');
            return null;
        case 'courseDetail':
            const courseToView = viewingCourseId ? getCourse(viewingCourseId) : null;
            if (courseToView && currentUser.role === 'student') {
                return <CourseDetailPage course={courseToView} currentUser={currentUser} onAddToCart={handleAddToCart} onBack={() => navigate('browseCourses')} />;
            }
            setCurrentPage('browseCourses');
            return null;
        case 'cart':
            if (currentUser.role === 'student') {
                return <CartPage user={currentUser} onRemoveFromCart={handleRemoveFromCart} onNavigate={navigate} />;
            }
            setCurrentPage('dashboard');
            return null;

        case 'checkout':
            if (currentUser.role === 'student') {
                return <CheckoutPage user={currentUser} onCheckout={handleCheckout} onBack={() => navigate('cart')} />;
            }
            setCurrentPage('dashboard');
            return null;

        case 'course':
            const course = selectedCourseId ? getCourse(selectedCourseId) : null;
            if (course) {
                return <CoursePage course={course} onTakeQuiz={handleTakeQuiz} onBackToDashboard={handleBackToDashboard} />;
            }
            setCurrentPage('dashboard'); // Fallback to dashboard
            return null;

        case 'quiz':
            const quiz = currentQuizId ? getQuiz(currentQuizId) : null;
            if (quiz) {
                return <QuizPage quiz={quiz} onBackToCourse={handleBackToCourse} />;
            }
            setCurrentPage('course'); // Fallback to course view
            return null;
        
        case 'courseEditor':
            const courseToEdit = editingCourseId ? getCourse(editingCourseId) : null;
            return <CourseEditor course={courseToEdit} user={currentUser} onSave={handleSaveCourse} onBack={handleBackToDashboard} onEditQuiz={handleEditQuiz} />;

        case 'quizEditor':
            const quizToEdit = editingQuizId ? getQuiz(editingQuizId) : null;
            return <QuizEditor quiz={quizToEdit} onSave={handleSaveQuiz} onBack={handleBackToCourseEditor} quizId={editingQuizId} />;
        
        case 'manageUsers':
            if (currentUser.role === 'admin') {
                return <ManageUsersPage key={dataVersion} onAddUser={() => handleOpenUserModal(null)} onEditUser={handleOpenUserModal} onDeleteUser={handleDeleteUser} onBack={handleBackToDashboard} />;
            }
            setCurrentPage('dashboard');
            return null;
        
        case 'manageCourses':
            if (currentUser.role === 'admin') {
                return <ManageCoursesPage key={dataVersion} onBack={handleBackToDashboard} onDeleteCourse={handleDeleteCourse} />;
            }
            setCurrentPage('dashboard');
            return null;

        case 'dashboard':
        default:
            switch (currentUser.role) {
                case 'student':
                    return <StudentDashboard user={currentUser} onNavigateToCourse={handleNavigateToCourse} />;
                case 'teacher':
                    return <TeacherDashboard user={currentUser} onEditCourse={handleEditCourse} onCreateCourse={handleCreateCourse} onDeleteCourse={handleDeleteCourse} />;
                case 'admin':
                    return <AdminDashboard user={currentUser} onNavigateToManageUsers={handleNavigateToManageUsers} onNavigateToManageCourses={handleNavigateToManageCourses} />;
                default:
                    return <p>Error: Unknown user role.</p>;
            }
    }
  };

  const cartItemCount = (currentUser?.role === 'student' && currentUser.cart) ? currentUser.cart.length : 0;

  return (
    <div ref={scrollRef} data-scroll-container>
      <div data-scroll-section>
        <Header onNavigate={navigate} currentUser={currentUser} onSignOut={handleSignOut} cartItemCount={cartItemCount} />
        <main>
          {renderPage()}
        </main>
        {isUserModalOpen && (
          <UserModal
              user={editingUser}
              onClose={handleCloseUserModal}
              onSave={handleSaveUser}
          />
        )}
        <Footer />
      </div>
    </div>
  );
};

export default App;