import { createClient } from "@libsql/client";

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

export default async function Home() {
  const rs = await libsql.execute("select * from post");
  const posts = rs.rows as unknown as Array<{
    id: string;
    title: string;
    content: string;
  }>;

  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
      className="h-screen p-8 bg-gray-50"
    >
      <h1>Welcome to Remix</h1>
      {posts.length === 0 && <li>No posts found.</li>}
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        );
      })}
    </div>
  );
}
