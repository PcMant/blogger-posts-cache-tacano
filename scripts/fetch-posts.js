const fs = require("fs");
const fetch = require("node-fetch");

const API_KEY = process.env.BLOGGER_API_KEY;
const BLOG_ID = process.env.BLOGGER_BLOG_ID;

(async () => {
  try {
    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=50`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) {
      throw new Error("No posts found");
    }

    const posts = data.items.map(post => {
      // Miniatura: Blogger la suele poner en content con <img>
      const match = post.content?.match(/<img[^>]+src="([^">]+)"/);
      const thumbnail = match ? match[1] : null;

      return {
        id: post.id,
        title: post.title,
        published: post.published,
        url: post.url,
        categories: post.labels || [],
        thumbnail
      };
    });

    // Guardar en data/blog-posts.json
    fs.mkdirSync("data", { recursive: true });
    fs.writeFileSync("data/blog-posts.json", JSON.stringify(posts, null, 2));

    console.log("✅ Blogger posts cached:", posts.length);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    process.exit(1);
  }
})();
