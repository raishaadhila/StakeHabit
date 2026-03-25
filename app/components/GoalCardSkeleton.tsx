export function GoalCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-5 border border-gray-700 animate-pulse">
      <div className="flex justify-between">
        <div className="h-5 bg-gray-700 rounded w-1/2" />
        <div className="h-5 bg-gray-700 rounded w-16" />
      </div>
      <div className="h-4 bg-gray-700 rounded w-1/3 mt-3" />
      <div className="h-4 bg-gray-700 rounded w-1/4 mt-2" />
    </div>
  );
}
