import { GraduationCap } from 'lucide-react';

export default function Education() {
  const educationList = [
    {
      date: 'Sep 2023 - May 2026',
      degree: 'Bachelor of Engineering – E&TC Engineering',
      institution: 'Savitribai Phule Pune University (SPPU) Affiliated Institute',
      details:
        'Studying core principles of electronics, high-speed communication systems, embedded hardware integration, and internet of things (IoT). Gained practical proficiency in signal processing, PCB routing, and microcontroller programming.',
    },
    {
      date: 'Jul 2020 - Jul 2023',
      degree: 'Diploma In Mechatronics',
      institution: 'Indo German Tool Room (IGTR), Sambhajinagar',
      details:
        'Completed an intensive 3-year curriculum focusing on automated systems, electro-pneumatics, robotics integration, and CNC machining. Gained practical experience in industrial controllers (PLCs), CAD/CAM designs, and robotics control pipelines.',
    },
  ];

  return (
    <section id="education" className="reveal">
      <h2 className="section-title">
        My <span>Education</span>
      </h2>

      <div className="timeline-container">
        <div className="timeline">
          {educationList.map((edu, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">{edu.date}</span>
                <h3 className="timeline-title">{edu.degree}</h3>
                <div className="timeline-subtitle">
                  <GraduationCap size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  {edu.institution}
                </div>
                <p className="timeline-body-text" style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {edu.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
