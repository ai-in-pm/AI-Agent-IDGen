export const generateUniqueId = (type: 'human' | 'ai'): string => {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  const sequence = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  
  return type === 'human' 
    ? `HUM-${year}-${sequence}`
    : `ADAM-${random}-${year}-${sequence}`;
};

export const generateBatch = (type: 'human' | 'ai', count: number): string[] => {
  return Array.from({ length: count }, () => generateUniqueId(type));
};