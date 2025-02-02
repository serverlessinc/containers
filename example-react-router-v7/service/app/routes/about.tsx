import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Serverless Container Framework - Example React Router v7" },
    { name: "description", content: "Serverless Container Framework example using React Router v7" },
  ];
}

export default function Home() {
  return <div>A simple about page</div>;
}
