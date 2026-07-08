import { Briefcase } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      date: 'Dec 2024 - Feb 2025',
      title: 'SAP Code Unnati Internship Program',
      subtitle: 'Data & AI Intern',
      bullets: [
        'Deep dive into data-related engineering practices and machine learning paradigms.',
        'Gained hands-on experience applying Artificial Intelligence solutions to IoT and healthcare datasets.',
        'Explored SAP technologies, data tables, and gained foundational exposure to SAP ABAP.',
      ],
    },
    {
      date: 'Jan 2025 - Feb 2025',
      title: 'VOIS – Tech University Engagement Program',
      subtitle: 'Virtual Technology Intern (Vodafone Intelligent Solutions)',
      bullets: [
        'Explored emerging networking architectures, corporate tech deployments, and telecom infrastructure.',
        'Learned about cloud orchestration, telecom systems integration, and cybersecurity standards.',
        'Developed professional delivery capabilities, collaborating in virtual workshops with domain experts.',
      ],
    },
  ];

  return (
    <section id="experience" className="reveal">
      <h2 className="section-title">
        Work <span>Experience</span>
      </h2>

      <div className="timeline-container">
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div className="timeline-item" key={idx}>
              <div className="timeline-dot"></div>
              <div className="timeline-content glass-panel">
                <span className="timeline-date">{exp.date}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <div className="timeline-subtitle">
                  <Briefcase size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  {exp.subtitle}
                </div>
                <div className="timeline-body">
                  <ul>
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
