/**
 * Simple health check route component that renders a minimal page and returns 200 status
 * @returns {JSX.Element} Health check page
 */
export default function Health() {
  return (
    <div className="p-4">
      <h1>OK</h1>
    </div>
  );
}

/**
 * Loader function to set status code for health check
 * @returns {Response} Response with 200 status code
 */
export function loader() {
  return new Response("OK", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

/**
 * Metadata configuration for the health check route
 * @returns {Array<Object>} Array of meta tags
 */
export function meta() {
  return [
    { title: "Health Check" },
    { name: "description", content: "Application health check endpoint" },
  ];
} 