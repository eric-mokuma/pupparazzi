interface Props {
  error: Error | null | undefined
}

export default function ErrorMessage({ error }: Props) {
  const errorMessage = error ? String(error) : 'Oops! Something went wrong'

  return (
    <p className="error-message">Oops! Something went wrong: {errorMessage}</p>
  )
}
