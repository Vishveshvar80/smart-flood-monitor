import { Cpu, Code2, Database, Mail, Languages, MapPin } from 'lucide-react';

export default function About() {
  const infoItems = [
    { icon: <MapPin size={18} />, label: 'Location', value: 'Pune, India' },
    { icon: <Mail size={18} />, label: 'Email', value: 'vishveshvar7776@gmail.com' },
    { icon: <Languages size={18} />, label: 'Languages', value: 'English, Hindi, Marathi' },
  ];

  const focusAreas = [
    {
      icon: <Cpu className="focus-icon-svg" />,
      title: 'Electronics & IoT',
      description:
        'Enthusiastically building embedded systems and IoT prototypes. Experienced with ESP8266 NodeMCU, sensory integration, and real-time logging schemas.',
    },
    {
      icon: <Code2 className="focus-icon-svg" />,
      title: 'Software Development',
      description:
        'Passionate about writing clean, typed, and structured code in Java, C++, and Python. Focused on modular algorithms and scalable logic.',
    },
    {
      icon: <Database className="focus-icon-svg" />,
      title: 'AI & Data Engineering',
      description:
        'Applying machine learning algorithms (Logistic Regression, Random Forests) for prediction tasks, writing SQL queries, and processing analytical datasets.',
    },
  ];

  return (
    <section id="about" className="reveal">
      <h2 className="section-title">
        About <span>Me</span>
      </h2>

      <div className="about-content grid-2">
        <div className="about-details-card glass-panel">
          <h3>My Background</h3>
          <p className="about-bio">
            I am a student of Electronics and Telecommunication Engineering with a deep-seated passion for the crossover
            between hardware engineering and modern software development. With hands-on experience ranging from 
            embedded systems and automation circuits to machine learning and database queries, I enjoy solving multi-disciplinary 
            challenges that combine hardware interfaces with intelligent data backends.
          </p>

          <div className="info-grid">
            {infoItems.map((item, idx) => (
              <div className="info-item" key={idx}>
                <span className="info-icon-wrapper">{item.icon}</span>
                <div>
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-focus-cards">
          <h3>Core Focus Areas</h3>
          <div className="focus-grid-container">
            {focusAreas.map((area, idx) => (
              <div className="focus-card glass-panel" key={idx}>
                <div className="focus-icon">{area.icon}</div>
                <div className="focus-text">
                  <h4>{area.title}</h4>
                  <p>{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
