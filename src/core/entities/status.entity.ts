export const Status: {
    STARTED: 'STARTED';
    PENDING: 'PENDING';
    APPROVED: 'APPROVED';
    IN_PROGRESS: 'IN_PROGRESS';
    READY: 'READY';
    FINISHED: 'FINISHED';
    CANCELLED: 'CANCELLED';
  } = {
    STARTED: 'STARTED',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    IN_PROGRESS: 'IN_PROGRESS',
    READY: 'READY',
    FINISHED: 'FINISHED',
    CANCELLED: 'CANCELLED',
  };
  
  export type Status = (typeof Status)[keyof typeof Status];
  