import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

interface ApiPreviewProps {
  url: string;
}

export function ApiPreview({ url }: ApiPreviewProps) {
  const openApiUrl = `${url.replace(/\/$/, '')}/openapi.json`;

  return (
    <div className="h-full w-full bg-white">
      <SwaggerUI url={openApiUrl} />
    </div>
  );
}