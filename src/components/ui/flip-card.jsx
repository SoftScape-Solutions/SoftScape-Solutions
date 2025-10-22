import React, { useState } from 'react';

// Function to generate unique backgrounds based on card title/content
const getUniqueBackground = (title) => {
  const backgrounds = {
    'AI Chatbots & Agents': {
      bg: 'bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800',
      pattern: 'chat-pattern',
      accent: 'from-cyan-400/30 to-blue-500/30'
    },
    'Smart Automation Tools': {
      bg: 'bg-gradient-to-br from-purple-600 via-violet-700 to-purple-900',
      pattern: 'automation-pattern',
      accent: 'from-pink-400/30 to-purple-500/30'
    },
    'AI-Enhanced Applications': {
      bg: 'bg-gradient-to-br from-orange-600 via-red-600 to-pink-700',
      pattern: 'apps-pattern',
      accent: 'from-orange-400/30 to-red-500/30'
    },
    'Custom AI Solutions': {
      bg: 'bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900',
      pattern: 'custom-pattern',
      accent: 'from-indigo-400/30 to-purple-500/30'
    },
    'Web App Development': {
      bg: 'bg-gradient-to-br from-emerald-600 via-teal-700 to-green-800',
      pattern: 'web-pattern',
      accent: 'from-emerald-400/30 to-teal-500/30'
    },
    'App Development': {
      bg: 'bg-gradient-to-br from-cyan-600 via-blue-700 to-teal-800',
      pattern: 'mobile-pattern',
      accent: 'from-cyan-400/30 to-blue-500/30'
    },
    // About page values
    'Innovation': {
      bg: 'bg-gradient-to-br from-blue-600 via-cyan-700 to-blue-800',
      pattern: 'innovation-pattern',
      accent: 'from-blue-400/30 to-cyan-500/30'
    },
    'Excellence': {
      bg: 'bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800',
      pattern: 'excellence-pattern',
      accent: 'from-emerald-400/30 to-green-500/30'
    },
    'Security': {
      bg: 'bg-gradient-to-br from-purple-600 via-violet-700 to-purple-900',
      pattern: 'security-pattern',
      accent: 'from-purple-400/30 to-violet-500/30'
    },
    'Automation': {
      bg: 'bg-gradient-to-br from-orange-600 via-amber-700 to-yellow-800',
      pattern: 'automation-pattern',
      accent: 'from-orange-400/30 to-amber-500/30'
    },
    // Explore Tools - more tool-specific backgrounds
    'GitHub Copilot': {
      bg: 'bg-gradient-to-br from-gray-800 via-slate-800 to-black',
      pattern: 'code-pattern',
      accent: 'from-gray-500/30 to-slate-600/30'
    },
    'ChatGPT': {
      bg: 'bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800',
      pattern: 'chat-pattern',
      accent: 'from-green-400/30 to-emerald-500/30'
    },
    'Claude AI': {
      bg: 'bg-gradient-to-br from-orange-600 via-amber-700 to-orange-800',
      pattern: 'ai-pattern',
      accent: 'from-orange-400/30 to-amber-500/30'
    },
    'Midjourney': {
      bg: 'bg-gradient-to-br from-purple-600 via-violet-700 to-indigo-800',
      pattern: 'art-pattern',
      accent: 'from-purple-400/30 to-violet-500/30'
    },
    'Notion AI': {
      bg: 'bg-gradient-to-br from-slate-600 via-gray-700 to-zinc-800',
      pattern: 'productivity-pattern',
      accent: 'from-slate-400/30 to-gray-500/30'
    },
    'Figma': {
      bg: 'bg-gradient-to-br from-pink-600 via-rose-700 to-red-800',
      pattern: 'design-pattern',
      accent: 'from-pink-400/30 to-rose-500/30'
    },
    'Canva': {
      bg: 'bg-gradient-to-br from-blue-600 via-cyan-700 to-teal-800',
      pattern: 'design-pattern',
      accent: 'from-blue-400/30 to-cyan-500/30'
    },
    'Zapier': {
      bg: 'bg-gradient-to-br from-orange-600 via-red-700 to-pink-800',
      pattern: 'automation-pattern',
      accent: 'from-orange-400/30 to-red-500/30'
    },
    'default': {
      bg: 'bg-gradient-to-br from-slate-600 via-gray-700 to-slate-800',
      pattern: 'default-pattern',
      accent: 'from-slate-400/30 to-gray-500/30'
    }
  };

  return backgrounds[title] || backgrounds['default'];
};

// Function to get unique SVG pattern based on card type
const getPatternSVG = (patternType) => {
  const patterns = {
    'chat-pattern': (
      <>
        <circle cx="50" cy="50" r="20" fill="white" opacity="0.1" />
        <circle cx="150" cy="100" r="15" fill="white" opacity="0.08" />
        <rect x="80" y="120" width="40" height="20" rx="10" fill="white" opacity="0.06" />
      </>
    ),
    'automation-pattern': (
      <>
        <rect x="40" y="40" width="60" height="60" rx="8" fill="white" opacity="0.1" />
        <rect x="120" y="80" width="40" height="40" rx="6" fill="white" opacity="0.08" />
        <line x1="100" y1="70" x2="140" y2="100" stroke="white" strokeWidth="2" opacity="0.06" />
      </>
    ),
    'apps-pattern': (
      <>
        <rect x="30" y="30" width="50" height="70" rx="8" fill="white" opacity="0.1" />
        <rect x="100" y="50" width="60" height="50" rx="6" fill="white" opacity="0.08" />
        <circle cx="180" cy="40" r="12" fill="white" opacity="0.06" />
      </>
    ),
    'custom-pattern': (
      <>
        <polygon points="50,20 80,60 20,60" fill="white" opacity="0.1" />
        <polygon points="150,40 180,80 120,80" fill="white" opacity="0.08" />
        <rect x="90" y="100" width="30" height="30" rx="4" fill="white" opacity="0.06" />
      </>
    ),
    'web-pattern': (
      <>
        <rect x="40" y="40" width="80" height="50" rx="4" fill="white" opacity="0.1" />
        <rect x="140" y="70" width="60" height="40" rx="4" fill="white" opacity="0.08" />
        <line x1="50" y1="90" x2="110" y2="90" stroke="white" strokeWidth="3" opacity="0.06" />
      </>
    ),
    'mobile-pattern': (
      <>
        <rect x="60" y="30" width="40" height="80" rx="8" fill="white" opacity="0.1" />
        <rect x="130" y="50" width="35" height="70" rx="6" fill="white" opacity="0.08" />
        <circle cx="180" cy="85" r="8" fill="white" opacity="0.06" />
      </>
    ),
    'code-pattern': (
      <>
        <rect x="40" y="40" width="60" height="4" rx="2" fill="white" opacity="0.1" />
        <rect x="40" y="55" width="80" height="4" rx="2" fill="white" opacity="0.08" />
        <rect x="40" y="70" width="50" height="4" rx="2" fill="white" opacity="0.06" />
        <rect x="140" y="100" width="40" height="40" rx="6" fill="white" opacity="0.04" />
      </>
    ),
    'ai-pattern': (
      <>
        <circle cx="60" cy="60" r="25" fill="white" opacity="0.1" />
        <circle cx="150" cy="90" r="18" fill="white" opacity="0.08" />
        <circle cx="200" cy="50" r="12" fill="white" opacity="0.06" />
        <path d="M80 80 L120 120 L100 140 Z" fill="white" opacity="0.04" />
      </>
    ),
    'art-pattern': (
      <>
        <polygon points="60,30 90,70 30,70" fill="white" opacity="0.1" />
        <polygon points="160,50 190,90 130,90" fill="white" opacity="0.08" />
        <circle cx="100" cy="150" r="20" fill="white" opacity="0.06" />
        <rect x="180" y="120" width="25" height="25" rx="12" fill="white" opacity="0.04" />
      </>
    ),
    'design-pattern': (
      <>
        <rect x="50" y="50" width="70" height="50" rx="25" fill="white" opacity="0.1" />
        <rect x="140" y="80" width="50" height="35" rx="17" fill="white" opacity="0.08" />
        <circle cx="80" cy="140" r="15" fill="white" opacity="0.06" />
        <rect x="160" y="130" width="30" height="20" rx="10" fill="white" opacity="0.04" />
      </>
    ),
    'productivity-pattern': (
      <>
        <rect x="50" y="50" width="80" height="20" rx="4" fill="white" opacity="0.1" />
        <rect x="50" y="80" width="60" height="20" rx="4" fill="white" opacity="0.08" />
        <rect x="50" y="110" width="90" height="20" rx="4" fill="white" opacity="0.06" />
        <circle cx="180" cy="80" r="12" fill="white" opacity="0.04" />
      </>
    ),
    'default-pattern': (
      <>
        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
      </>
    )
  };

  return patterns[patternType] || patterns['default-pattern'];
};

// Function to get dynamic features based on card title
const getCardFeatures = (title) => {
  const features = {
    'AI Chatbots & Agents': [
      'Natural Language Processing',
      'Multi-platform Integration',
      '24/7 Automated Support',
      'Smart Response Learning'
    ],
    'Smart Automation Tools': [
      'Workflow Optimization',
      'Process Documentation',
      'Error Reduction Technology',
      'Real-time Analytics'
    ],
    'AI-Enhanced Applications': [
      'Intelligent User Interface',
      'Predictive Analytics',
      'Machine Learning Models',
      'Cloud-based Architecture'
    ],
    'Custom AI Solutions': [
      'Tailored ML Algorithms',
      'Industry-specific Training',
      'End-to-end Development',
      'Ongoing Optimization'
    ],
    'Web App Development': [
      'Responsive Design',
      'Modern Frameworks',
      'SEO Optimization',
      'Performance Tuning'
    ],
    'App Development': [
      'Cross-platform Support',
      'Native Performance',
      'User Experience Design',
      'App Store Deployment'
    ],
    'Innovation': [
      'Cutting-edge Technology',
      'Creative Problem Solving',
      'Future-ready Solutions',
      'Continuous Research'
    ],
    'Excellence': [
      'Quality Assurance',
      'Best Practices',
      'Performance Optimization',
      'Customer Satisfaction'
    ],
    'Security': [
      'Data Protection',
      'Secure Architecture',
      'Compliance Standards',
      'Risk Management'
    ],
    'Automation': [
      'Process Efficiency',
      'Cost Reduction',
      'Time Optimization',
      'Scalable Systems'
    ],
    // Tool-specific features
    'GitHub Copilot': [
      'AI-powered Code Suggestions',
      'Multi-language Support',
      'Context-aware Completions',
      'Productivity Boost'
    ],
    'ChatGPT': [
      'Natural Conversations',
      'Content Generation',
      'Problem Solving',
      'Multiple Use Cases'
    ],
    'Claude AI': [
      'Advanced Reasoning',
      'Document Analysis',
      'Ethical AI Responses',
      'Long-form Content'
    ],
    'Midjourney': [
      'AI Art Generation',
      'Creative Imagery',
      'Style Variations',
      'High-quality Output'
    ],
    'Notion AI': [
      'Smart Documentation',
      'Content Organization',
      'Writing Assistant',
      'Knowledge Management'
    ],
    'Figma': [
      'Collaborative Design',
      'Prototyping Tools',
      'Real-time Editing',
      'Design Systems'
    ],
    'Canva': [
      'Template Library',
      'Easy Design Tools',
      'Brand Consistency',
      'Quick Publishing'
    ],
    'Zapier': [
      'Workflow Automation',
      '5000+ Integrations',
      'No-code Solutions',
      'Time-saving Triggers'
    ],
    'default': [
      'Advanced Technology',
      'Expert Support',
      'Custom Solutions',
      'Proven Results'
    ]
  };

  return features[title] || features['default'];
};

export const FlipCard = ({ 
  frontContent, 
  backContent, 
  className = "", 
  onClick, 
  bgColor = "bg-blue-500", 
  textColor = "text-blue-500",
  icon,
  title,
  description,
  price,
  category 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Get unique styling based on title
  const uniqueStyle = getUniqueBackground(title);
  const actualBgColor = bgColor && bgColor !== "bg-blue-500" ? bgColor : uniqueStyle.bg;
  const patternType = uniqueStyle.pattern;

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  // If custom content is provided, use the original flip card design
  if (frontContent && backContent) {
    return (
      <div
        className={`relative cursor-pointer ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ 
          width: '100%', 
          height: '320px',
          perspective: '1000px'
        }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          <div 
            className="absolute inset-0 w-full h-full rounded-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {frontContent}
          </div>
          
          <div 
            className="absolute inset-0 w-full h-full rounded-lg"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            {backContent}
          </div>
        </div>
      </div>
    );
  }

  // New stylish card design with flip functionality
  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ 
        width: '300px', 
        height: '400px', // Increased height for better button alignment
        perspective: '1000px',
        margin: '12px'
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front Face - Stylish Card */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-lg overflow-hidden ${actualBgColor} shadow-lg flex flex-col`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Background Pattern */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 300 380"
            fill="none"
            style={{ opacity: 0.1 }}
          >
            {getPatternSVG(patternType)}
          </svg>

          {/* Animated Background Accent */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${uniqueStyle.accent} opacity-20 animate-pulse`}
            style={{ 
              animation: 'pulse 3s ease-in-out infinite',
              mixBlendMode: 'overlay'
            }}
          />

          {/* Icon/Image Section */}
          <div className="relative pt-8 px-6 flex items-center justify-center flex-shrink-0" style={{ height: '120px' }}>
            <div
              className="block absolute w-32 h-32 bottom-0 left-0 -mb-16 ml-2"
              style={{
                background: "radial-gradient(black, transparent 60%)",
                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                opacity: 0.2,
              }}
            />
            <div className="relative w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              {icon && React.cloneElement(icon, { className: "w-8 h-8 text-white" })}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative text-white px-6 pb-4 mt-6 flex flex-col h-full">
            <div className="flex-1">
              {category && <span className="block opacity-75 -mb-1 text-sm">{category}</span>}
              <div className="mb-3">
                <span className="block font-semibold text-xl leading-tight pr-2">{title}</span>
              </div>
              {description && (
                <p className="text-white/80 text-sm leading-relaxed mb-4">{description}</p>
              )}
              <div className="text-xs text-white/60 animate-pulse">
                Hover to see more details
              </div>
            </div>
            
            {/* Aligned Learn More Button */}
            <div className="mt-auto pt-4">
              {price && (
                <div className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg backdrop-blur-sm text-center cursor-pointer">
                  {price}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Face - Detailed Information */}
        <div 
          className={`absolute inset-0 w-full h-full rounded-lg overflow-hidden ${actualBgColor} shadow-xl`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {/* Background Pattern for Back Face */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 300 380"
            fill="none"
            style={{ opacity: 0.05 }}
          >
            {getPatternSVG(patternType)}
          </svg>
          <div className="p-6 text-white h-full flex flex-col relative z-10">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-4 flex-shrink-0">
              {icon && React.cloneElement(icon, { className: "w-8 h-8 text-white drop-shadow-lg" })}
              <h3 className="text-xl font-bold drop-shadow-md">{title}</h3>
            </div>
            
            {/* Main Content - Flexible */}
            <div className="flex-1 flex flex-col">
              <p className="text-white/90 mb-4 leading-relaxed drop-shadow-sm text-sm">
                {description}
              </p>
              
              <div className="space-y-3 flex-1">
                <h4 className="font-semibold text-white drop-shadow-sm text-sm">Key Features:</h4>
                <ul className="space-y-1.5">
                  {getCardFeatures(title).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-white/90 text-xs">
                      <span className="w-1.5 h-1.5 bg-white/80 rounded-full shadow-sm flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {category && (
                <div className="mt-3 px-3 py-1 bg-white/20 rounded-full text-xs font-medium text-white/90 inline-block w-fit">
                  {category}
                </div>
              )}
            </div>
            
            {/* Bottom Button - Always at bottom */}
            <div className="mt-4 pt-4 border-t border-white/10 flex-shrink-0">
              <button className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg backdrop-blur-sm">
                {price === "Learn More" ? "Discover More →" : `Starting at ${price} →`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
