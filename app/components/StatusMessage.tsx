interface Props {
  message: string;
  type?: "success" | "error" | "info";
}

export function StatusMessage({ message, type = "info" }: Props) {
  if (!message) return null;
  const styles = {
    success: "bg-green-900/50 border-green-700 text-green-300",
    error: "bg-red-900/50 border-red-700 text-red-300",
    info: "bg-yellow-900/50 border-yellow-700 text-yellow-300",
  };
  return (
    <div className={`text-sm px-4 py-3 rounded-lg border ${styles[type]}`}>
      {message}
    </div>
  );
}
