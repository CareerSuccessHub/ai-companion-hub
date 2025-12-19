"use client";

interface ToolCapabilitiesProps {
  canDo: string[];
  cantDo: string[];
}

export default function ToolCapabilities({ canDo, cantDo }: ToolCapabilitiesProps) {
  return (
    <div className="mb-4 bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
      <div className="grid md:grid-cols-2 gap-3 text-xs">
        {/* Can Do */}
        <div>
          <h4 className="font-semibold text-green-400 mb-1.5 flex items-center gap-1">
            <span className="text-[10px]">✓</span> Can Do
          </h4>
          <ul className="space-y-1 text-gray-400">
            {canDo.map((item, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <span className="text-green-400/60 mt-0.5 text-[10px]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Can't Do */}
        <div>
          <h4 className="font-semibold text-red-400 mb-1.5 flex items-center gap-1">
            <span className="text-[10px]">✗</span> Can&apos;t Do
          </h4>
          <ul className="space-y-1 text-gray-400">
            {cantDo.map((item, index) => (
              <li key={index} className="flex items-start gap-1.5">
                <span className="text-red-400/60 mt-0.5 text-[10px]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
