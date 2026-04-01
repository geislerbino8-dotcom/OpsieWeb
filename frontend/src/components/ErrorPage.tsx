import {
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";
  let status: number | undefined;

  if (isRouteErrorResponse(error)) {
    // React Router error (like 404, 500)
    status = error.status;
    title = error.statusText || title;
    message = error.data || message;
  } else if (error instanceof Error) {
    // JS runtime error
    message = error.message;
  }

  return (
    <div style={styles.container}>
      {status && <h1 style={styles.code}>{status}</h1>}
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.message}>{message}</p>

      <button style={styles.button} onClick={() => window.location.href = "/"}>
        Go Home
      </button>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    background: "#f9fafb",
  },
  code: {
    fontSize: "64px",
    color: "#ef4444",
    margin: 0,
  },
  title: {
    fontSize: "24px",
    margin: "10px 0",
  },
  message: {
    color: "#6b7280",
    maxWidth: "400px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
  },
};