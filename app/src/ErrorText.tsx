export default function ErrorText({ error }: { error: string }) {
  if (! error) return <></>
  return <p className="my-4 text-white">{error}</p>
}
