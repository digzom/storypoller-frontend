"use client";

import React from "react";

type StoryContentProps = {
  title: string;
  content: string;
  week: string;
  part: string;
};

const StoryContent: React.FC<StoryContentProps> = ({
  title,
  content,
  week,
  part,
}: StoryContentProps) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Week #{week}</h2>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-4">Part {part}</p>
      <div className="text-justify text-lg leading-8">
        {content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default StoryContent;
