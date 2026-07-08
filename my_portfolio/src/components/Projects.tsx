import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import projectIotImg from '../assets/project_iot.png';
import projectMlImg from '../assets/project_ml.png';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  features: string[];
  details: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    {
      id: 1,
      title: 'IoT-Based Fingerprint Biometric Attendance System',
      category: 'Electronics & IoT',
      description:
        'A comprehensive biometric logging system utilizing NodeMCU for instant in/out logging, linked to a centralized database with automated SMS/email notifications.',
      image: projectIotImg,
      tech: ['NodeMCU (ESP8266)', 'PHP', 'MySQL', 'HTML/CSS', 'Fingerprint Sensor', 'XAMPP'],
      features: [
        'Real-time fingerprint ingestion and logging',
        'Automatic absence detection and parent alerting via SMS/Email',
        'Centralized PHP dashboard for administrators and school managers',
        'Offline caching buffer for hardware connectivity tolerance',
      ],
      details:
        'This project integrates a fingerprint sensor with an ESP8266 micro-controller to upload scanned data directly to a PHP-backed MySQL server. Designed for real-world school or institutional environments, the system automates student tracking and notifies guardians instantly of absences using Twilio or local mail APIs. Built as a fully functional proof of concept.',
    },
    {
      id: 2,
      title: 'Heart Disease Prediction using Machine Learning',
      category: 'Artificial Intelligence & ML',
      description:
        'A predictive clinical decision support system utilizing supervised learning algorithms to assess patient cardiac risk parameters.',
      image: projectMlImg,
      tech: ['Python', 'scikit-learn', 'Pandas', 'Matplotlib', 'Jupyter Notebook'],
      features: [
        'Exploratory data analysis of cardiovascular parameters',
        'Model comparisons between Logistic Regression and Random Forest',
        'Performance profiling using confusion matrices and classification reports',
        'Hyperparameter tuning for precision optimization',
      ],
      details:
        'Developed a machine learning workflow that predicts heart disease likelihood based on key indicators (age, cholesterol, heart rate, chest pain type). The model is optimized for recall (reducing false negatives in medical diagnostics) and evaluated thoroughly using ROC curves, classification metrics, and Jupyter analyses.',
    },
  ];

  return (
    <section id="projects" className="reveal">
      <h2 className="section-title">
        Featured <span>Projects</span>
      </h2>

      <div className="projects-grid grid-2">
        {projectsList.map((project) => (
          <div className="project-card glass-panel" key={project.id}>
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-category-badge">{project.category}</div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech-tags">
                {project.tech.map((t, idx) => (
                  <span className="project-tech-tag" key={idx}>
                    {t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => setSelectedProject(project)}
                className="btn btn-secondary project-detail-btn"
              >
                View Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal Overlay */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
              <X size={24} />
            </button>
            <div className="modal-layout">
              <div className="modal-image-panel">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <div className="modal-details-panel">
                <span className="modal-category">{selectedProject.category}</span>
                <h2>{selectedProject.title}</h2>
                <p className="modal-desc">{selectedProject.details}</p>

                <h3>Key Implementation Features</h3>
                <ul className="modal-features">
                  {selectedProject.features.map((feature, fIdx) => (
                    <li key={fIdx}>{feature}</li>
                  ))}
                </ul>

                <h3>Tech Stack</h3>
                <div className="modal-tech-list">
                  {selectedProject.tech.map((t, idx) => (
                    <span className="project-tech-tag" key={idx}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
