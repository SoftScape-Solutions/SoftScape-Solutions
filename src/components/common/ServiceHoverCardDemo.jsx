import React from "react";
import { Calendar } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export function ServiceHoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-blue-600 font-semibold">
          AI Chatbots & Agents
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">AI Chatbots & Agents</h4>
            <p className="text-sm">
              Intelligent conversational AI that handles customer service, sales, and support 24/7 with advanced natural language processing.
            </p>
            <div className="text-xs text-gray-600 space-y-1 mt-2">
              <div className="font-medium text-gray-900 mb-1">Key Features:</div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                Multi-language Support
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                24/7 Availability
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                CRM Integration
              </div>
            </div>
            <div className="flex items-center pt-2">
              <Calendar className="mr-2 h-3 w-3 opacity-70" />
              <span className="text-xs text-muted-foreground">
                Available now • Click to learn more
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}