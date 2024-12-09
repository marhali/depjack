/**
 * Represents a function that logs its payload.
 */
export type LogFunction = (...data: unknown[]) => void;

/**
 * Represents a logger that is capable of logging to different log levels.
 */
export type Logger = {
  log: LogFunction;
  info: LogFunction;
  debug: LogFunction;
  warn: LogFunction;
  error: LogFunction;
};
