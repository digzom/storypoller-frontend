"use client";

import React from "react";
import Layout from "../components/Layout";
import StoryContent from "../components/StoryContent";
import VotingSection from "../components/VotingSection";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <StoryContent
            title="The Whisperer"
            content={content}
            part="1"
            week="1"
          />
        </div>
        <div className="col-span-2">
          <VotingSection votingOptions={votingOptions} totalVotes={50} />
        </div>
      </div>
    </Layout>
  );
}

const content = `The old lighthouse stood tall and silent on the craggy cliff, its paint peeling and windows clouded with decades of salt and neglect. For years, the townspeople had avoided it, whispering tales of strange occurrences and unexplained disappearances. But when Mara inherited the property from her estranged grandfather, she couldn't resist the pull of its mysteries.\n As she approached the weathered door, key in hand, a chill ran down her spine. The sun was setting, casting long shadows across the overgrown path. Mara hesitated, her fingers trembling as they touched the rusty lock. Just as she was about to turn the key, a flicker of movement caught her eye in one of the upper windows.\n She froze, heart pounding. It couldn't be... The lighthouse had been abandoned for years. Yet there it was again - a dark silhouette, distinctly human, watching her from above.</p Mara's instincts screamed at her to run, but curiosity rooted her to the spot. Who - or what - was waiting for her inside the lighthouse? And why did she feel an inexplicable sense of familiarity, as if the shadows were calling out to her?\n`;

const votingOptions = [
  {
    id: "1",
    text: "Mara finds a hidden room filled with odd artifacts and her grandfather's journal, hinting at mysterious experiments.",
    votes: 8,
  },
  {
    id: "2",
    text: "Ghostly apparitions appear, attempting to communicate a crucial message through fragmented whispers and visions.",
    votes: 12,
  },
  {
    id: "3",
    text: "Time behaves strangely in the lighthouse - clocks run backward and Mara witnesses fleeting scenes from the past.",
    votes: 17,
  },
  {
    id: "4",
    text: "Old family photos and documents reveal a shocking truth about Mara's lineage and a long-kept lighthouse secret.",
    votes: 13,
  },
];
