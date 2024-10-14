export default async function Profile() {
  await new Promise((reslove) => setTimeout(reslove, 2000));

  return <p>Profile</p>;
}
