"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Docs",
};

export default function SwaggerDocs() {
  const [spec, setSpec] = useState(null);
  const { setTheme } = useTheme();

  setTheme("light");

  useEffect(() => {
    fetch("/api/v1/swagger")
      .then((response) => response.json())
      .then((data) => setSpec(data));
  }, []);

  if (!spec) {
    return (
      <div className="p-6">
        <Skeleton className="h-14 w-48 mb-6" />
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
      </div>
    );
  }

  return <SwaggerUI spec={spec} />;
}
