export default function ErrorText({ error }: { error: string }) {
  return <>{error && <p className="my-4 text-white">{error}</p>}</>
}
