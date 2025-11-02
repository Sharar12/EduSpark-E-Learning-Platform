import React, { useState, useEffect } from 'react';
import { saveCourse, deleteCourse, getCourse } from '../lib/courses.js';

import './CourseEditor.css';



const CourseEditor = ({ course, user, onSave, onBack, onEditQuiz }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (course) {
            setTitle(course.title);
            setDescription(course.description);
            setVideos(course.videos);
            setPrice(course.price || 0);
            setCategory(course.category || '');
            setThumbnailUrl(course.thumbnailUrl || '');
        }
    }, [course]);

    const handleAddVideo = () => {
        setVideos([...videos, { 
            id: `video-${Date.now()}`, 
            title: 'New Video', 
            duration: '00:00', 
            videoUrl: '', 
            quizId: `quiz-${Date.now()}`,
            resources: [] 
        }]);
    };

    const handleVideoChange = (index, field, value) => {
        const newVideos = [...videos];
        (newVideos[index])[field] = value;
        setVideos(newVideos);
    };

    const handleRemoveVideo = (index) => {
        const newVideos = videos.filter((_, i) => i !== index);
        setVideos(newVideos);
    };

    const handleSave = () => {
        const courseData = {
            id: '',
            createdAt: '',
            views: 0,
            enrolledCount: 0,
            revenue: 0,
            ...course,
            title,
            description,
            price: Number(price),
            category,
            thumbnailUrl,
            videos,
            authorId: user.id,
        };
        onSave(courseData);
    };

    return (
        <div className="editor-container">
            <header className="editor-header">
                <button className="back-button" onClick={onBack}>&larr; Back to Dashboard</button>
                <h1>{course ? 'Edit Course' : 'Create New Course'}</h1>
            </header>

            <div className="editor-form">
                <div className="form-grid">
                    <div className="form-group grid-span-2">
                        <label htmlFor="courseTitle">Course Title</label>
                        <input id="courseTitle" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Introduction to React" />
                    </div>
                     <div className="form-group">
                        <label htmlFor="courseCategory">Category</label>
                        <input id="courseCategory" type="text" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g., Web Development" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="coursePrice">Course Price ($)</label>
                        <input id="coursePrice" type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="e.g., 99.99" />
                    </div>
                    <div className="form-group grid-span-2">
                        <label htmlFor="thumbnailUrl">Thumbnail Image URL</label>
                        <input id="thumbnailUrl" type="text" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} placeholder="e.g., https://example.com/image.png" />
                    </div>
                    <div className="form-group grid-span-2">
                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea id="courseDescription" value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief summary of your course." rows={4}></textarea>
                    </div>
                </div>
            </div>

            <section className="playlist-editor">
                <h2>Video Playlist</h2>
                {videos.map((video, index) => (
                    <div key={video.id} className="video-editor-item">
                        <div className="video-inputs">
                            <input type="text" value={video.title} onChange={e => handleVideoChange(index, 'title', e.target.value)} placeholder="Video Title" />
                            <input type="text" value={video.duration} onChange={e => handleVideoChange(index, 'duration', e.target.value)} placeholder="Duration (e.g., 10:30)" />
                             <input type="text" value={video.resources.join(', ')} onChange={e => handleVideoChange(index, 'resources', e.target.value.split(',').map(s => s.trim()))} placeholder="Resources (comma-separated)" />
                        </div>
                        <div className="video-actions">
                            <button className="btn-secondary" onClick={() => onEditQuiz(video.quizId)}>Edit Quiz</button>
                            <button className="btn-danger" onClick={() => handleRemoveVideo(index)}>Remove</button>
                        </div>
                    </div>
                ))}
                <button className="btn-add-video" onClick={handleAddVideo}>+ Add Video</button>
            </section>

            <footer className="editor-footer">
                <button className="btn-primary" onClick={handleSave}>Save Course</button>
            </footer>
        </div>
    );
};

export default CourseEditor;