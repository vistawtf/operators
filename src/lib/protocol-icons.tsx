import React from 'react';

// Dynamic SVG icon component that loads from submodule
export const ProtocolIcon: React.FC<{ 
  protocolId: string; 
  className?: string 
}> = ({ protocolId, className = "w-6 h-6" }) => {
  const [hasError, setHasError] = React.useState(false);
  const logoPath = `/data/operators/logos/${protocolId.toLowerCase()}.svg`;
  
  if (hasError) {
    return <DefaultProtocolIcon className={className} />;
  }
  
  return (
    <img 
      src={logoPath}
      alt={`${protocolId} logo`}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

// Default fallback icon
export const DefaultProtocolIcon: React.FC<{ className?: string }> = ({ 
  className = "w-6 h-6" 
}) => (
  <div className={`${className} bg-gray-400 rounded-full flex items-center justify-center`}>
    <span className="text-xs font-bold text-white">?</span>
  </div>
);

// Function to get protocol icon (returns React component)
export function getProtocolIcon(protocolId: string): React.ReactNode {
  return <ProtocolIcon protocolId={protocolId} />;
}

// List of known protocol icons (update this when adding new protocols)
const KNOWN_PROTOCOLS = ['aztec', 'lido', 'buildernet', 'eigenda'];

// Function to check if a protocol has an icon (client-side safe)
export function hasProtocolIcon(protocolId: string): boolean {
  return KNOWN_PROTOCOLS.includes(protocolId.toLowerCase());
}

// Get all available protocol icons
export function getAvailableProtocolIcons(): string[] {
  return [...KNOWN_PROTOCOLS];
}
