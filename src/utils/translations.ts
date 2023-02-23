export const getGrade = (grade: string) => {
  if (grade === '높음') return 'high';
  else if (grade === '낮음') return 'low';
  else return 'medium';
};

export const getLevel = (level: string) => {
  if (level === '상') return 5;
  else if (level === '중상') return 4;
  else if (level === '중') return 3;
  else if (level === '중하') return 2;
  else return 1;
};
