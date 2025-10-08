import React from "react";
import { Brain } from "lucide-react";

const Section = ({
  id,
  title,
  description,
  icon: IconComponent = Brain,
  children,
  className = "",
  background = "bg-white",
  iconColor = "from-blue-600 to-purple-600",
}) => {
  return (
    <section
      id={id}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${background} ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-16 animate-fade-in">
            <div
              className={`section-icon-container bg-gradient-to-r ${iconColor}`}
            >
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            {title && <h2 className="section-title">{title}</h2>}
            {description && (
              <p className="section-description">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
