import { json } from "@remix-run/node";
import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface PhotoData {
  id: number;
  description: string;
  url: string;
  title: string;
  user: number;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const res = await fetch(
    "https://api.slingacademy.com/v1/sample-data/photos"
  ).then((res) => res.json());
  return json<PhotoData[]>(res.photos);
}

export default function Index() {
  const pictures = useLoaderData<typeof loader>();

  return (
    <>
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <h1 className="text-3xl font-bold mb-6">Notable Collection</h1>
      </div>
      <div className="flex">
        {pictures.map((p: PhotoData) => (
          <div key={p.id}>
            <img src={p.url} alt={p.title} />
          </div>
        ))}
      </div>
    </>
  );
}
