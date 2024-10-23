export default function Page({ params }: { params: { slug: string } }) {
  return <div className=" pt-28">My Post: {params.slug}</div>;
}
