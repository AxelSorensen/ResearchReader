

export const dynamicParams = true
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
