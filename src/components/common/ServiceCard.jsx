import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Bot, Brain, Sparkles, Cpu } from "lucide-react";

const iconMap = {
  Bot,
  Brain,
  Sparkles,
  Cpu,
};

const ServiceCard = ({ service, index = 0, isClickable = false }) => {
  const IconComponent = iconMap[service.icon];
  const delayClass = `animate-delay-${Math.min(index + 1, 4)}00`;
  const iconColorClass = `service-icon-${service.color}`;

  const cardContent = (
    <Card
      className={`card-enhanced hover-lift animate-slide-in ${delayClass} will-change-transform ${
        isClickable ? "cursor-pointer" : ""
      }`}
    >
      <CardHeader className="text-center">
        <div className={`${iconColorClass} icon-bounce`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">
          {service.title}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base md:text-lg">
          {service.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );

  if (service.link && isClickable) {
    return (
      <Link to={service.link} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default ServiceCard;
