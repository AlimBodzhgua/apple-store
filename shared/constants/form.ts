export const FormMode = {
  create: 'create',
  update: 'update',
} as const;

export type FormModeType = typeof FormMode[keyof typeof FormMode];
