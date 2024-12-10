import React from "react";
import { motion } from "framer-motion";

export default function Teams() {
  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "Founder & CEO",
      image: "src/images/team1.png", // Replace with actual image paths
      description: "Blockchain veteran with 10+ years of experience. Previously led AI initiatives at major tech companies. Passionate about combining AI with blockchain technology.",
      expertise: ["Blockchain", "AI", "Strategy"],
      linkedin: "https://linkedin.com/in/alexthompson",
      github: "https://github.com/alexthompson"
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer",
      image: "src/images/team2.png",
      description: "AI researcher turned blockchain enthusiast. PhD in Machine Learning from MIT. Leading the technical vision of Gain Chain.",
      expertise: ["AI/ML", "System Architecture", "Smart Contracts"],
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      image: "src/images/team3.png",
      description: "Product strategist with expertise in blockchain applications. Focused on creating seamless user experiences in Web3.",
      expertise: ["Product Strategy", "UX Design", "Tokenomics"],
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      github: "https://github.com/marcusrodriguez"
    },
    {
      name: "Emma Watson",
      role: "Lead Developer",
      image: "src/images/team4.png",
      description: "Full-stack developer specializing in blockchain infrastructure. Core contributor to several major DeFi projects.",
      expertise: ["Smart Contracts", "DeFi", "Full-Stack"],
      linkedin: "https://linkedin.com/in/emmawatson",
      github: "https://github.com/emmawatson"
    }
  ];

  return (
    <section className="py-24 px-6 lg:px-12" style={{ backgroundColor: "#001F54" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-blue-300 text-lg">The minds behind Gain Chain's innovation</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Member Image */}
              <div className="relative overflow-hidden rounded-xl aspect-square">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Glassmorphism Info Card - Shows on Hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 w-full h-full overflow-y-auto">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-blue-300 mb-3">{member.role}</p>
                    <p className="text-sm text-gray-300 mb-4">{member.description}</p>
                    
                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill) => (
                        <span 
                          key={skill}
                          className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex gap-4 justify-center mt-4">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-white transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
} 