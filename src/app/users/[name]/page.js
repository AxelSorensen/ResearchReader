
export const revalidate = 60;
export default function Other({params}) {
  

  return (
    <div>Hello other</div>
  )
}

export async function generateStaticParams() {
  const posts = [{slug: 'good'},{slug:'hello'}]

  return posts.map((post) => ({
    name: post.slug,
  }));
}
