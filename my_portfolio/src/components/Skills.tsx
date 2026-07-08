import { Terminal, Cpu, Brain, Wrench } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: <Terminal size={20} />,
      colorClass: 'skills-blue',
      skills: ['C', 'C++', 'Java', 'Python', 'SQL Query'],
    },
    {
      title: 'IoT & Electronics',
      icon: <Cpu size={20} />,
      colorClass: 'skills-purple',
      skills: ['NodeMCU (ESP8266)', 'Fingerprint Sensor', 'Circuit Design', 'Microcontrollers', 'PLCs'],
    },
    {
      title: 'Machine Learning & Data',
      icon: <Brain size={20} />,
      colorClass: 'skills-emerald',
      skills: ['scikit-learn', 'Pandas', 'Matplotlib', 'Data Engineering', 'Deep Learning'],
    },
    {
      title: 'Tools & Technologies',
      icon: <Wrench size={20} />,
      colorClass: 'skills-rose',
      skills: ['HTML / CSS', 'PHP', 'MySQL', 'XAMPP', 'Git & GitHub'],
    },
  ];

  return (
    <section id="skills" className="reveal">
      <h2 className="section-title">
        Technical <span>Skills</span>
      </h2>

      <div className="skills-grid grid-2">
        {skillCategories.map((category, index) => (
          <div className="skills-card glass-panel" key={index}>
            <div className={`skills-card-header ${category.colorClass}`}>
              <span className="skills-category-icon">{category.icon}</span>
              <h3>{category.title}</h3>
            </div>
            <div className="skills-list">
              {category.skills.map((skill, sIdx) => (
                <span className="skill-badge" key={sIdx}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
