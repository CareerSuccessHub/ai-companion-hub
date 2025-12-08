"use client";

export default function AdPlaceholder({ 
  size = "responsive",
  label = "Advertisement"
}: { 
  size?: "responsive" | "square" | "banner";
  label?: string;
}) {
  // Placeholder for Google AdSense
  // Replace this component with actual AdSense code after approval
  
  const sizeClasses = {
    responsive: "min-h-[250px] w-full",
    square: "w-[300px] h-[250px]",
    banner: "w-full h-[90px]"
  };

  return (
    <div className={`${sizeClasses[size]} bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center`}>
      <div className="text-center p-4">
        <p className="text-xs text-gray-600 mb-2">{label}</p>
        <p className="text-xs text-gray-700">
          Ad space - Coming soon
        </p>
      </div>
    </div>
  );
}
