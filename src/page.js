async function loader() {
  const res = await fetch("http://localhost:1337/api/home-page", {
    next: { revalidate: 0 },
  });

  const json = await res.json();
  return json.data;
}

export default async function Page() {
  const data = await loader();

  return (
    <div>
      <h1>{data?.title ?? "No Title"}</h1>
      <p>{data?.Description ?? "No Description"}</p>
    </div>
  );
}