// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import nodeHtmlToImage from "node-html-to-image";

export default async function generateQuoteshot(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, author, cover, excerpt } = req.query;

  const image = await nodeHtmlToImage({
    html: `
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet">
      </head>
      <body style="position: relative; font-family: 'Nunito', sans-serif; height: 335px; width: 600px;">
        <article
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            width: 100%;
          "
        >
          <div style="padding: 20px">
            <p>
              {{excerpt}}
            </p>
            <div>
              <p style="font-size: 12px;"><span style="font-weight: 700;">{{title}}</span><br />{{author}}</p>
            </div>
          </div>
          <div>
            <img src="{{cover}}" alt="{{title}} by {{author}}" style="height: 100%"/>
          </div>
        </article>
        <div style="position: absolute; top: 20px; left: 20px;">
          <img src="https://reademy-cafe.vercel.app/images/reademy.png" style="height: 32px; width:32px;" />
        </div>
      </body>
    </html>
    `,
    content: {
      title,
      author,
      cover,
      excerpt,
    },
  });
  res.writeHead(200, { "Content-Type": "image/png" });
  res.end(image, "binary");
}
