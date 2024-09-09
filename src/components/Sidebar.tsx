"use client";

import React from "react";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <aside className="min-w-64 bg-white shadow-md p-4">
      <h3 className="text-4xl text-center mb-3">StoryPoller</h3>
      <hr />
      <br />
      <div className="flex text-sm text-gray-500 gap-x-3 items-center">
        <div>
          <img
            alt="Photo"
            src="https://thispersondoesnotexist.com/"
            className="max-w-12 max-h-12 rounded-full"
          />
        </div>
        <div>
          <p className="text-base text-gray-900">cyberproblem.com.br</p>
          <p className="text-xs">SP 1029</p>
        </div>
      </div>
      <br />
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/votes" className="hover:text-blue-600">
              Your votes
            </Link>
          </li>
          <li>
            <Link href="/stories" className="hover:text-blue-600">
              Past stories
            </Link>
          </li>
          <li>
            <Link href="/ideas" className="hover:text-blue-600">
              Your plot ideas
            </Link>
          </li>
          <li>
            <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
              Create an opening
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
