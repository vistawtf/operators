// Main exports for protocol data consumption from git submodule

export * from './types';
export * from './protocols';
export * from './data';

// Convenience re-exports for common use cases
export {
  getAllProtocols as getProtocols,
  getActiveProtocols,
  getProtocolById,
  searchProtocols,
  getProtocolStats,
  clearProtocolsCache as clearCache
} from './protocols';

export type {
  Protocol,
  FlexibleProtocol,
  ProtocolsData,
  HardwareRequirements,
  OperatorOpportunity
} from './types';