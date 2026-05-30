"use client";
import React from "react";

export const ResponsiveContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">{children}</div>
);
