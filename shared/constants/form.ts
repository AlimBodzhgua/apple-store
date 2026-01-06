export const FormMode = {
  create: 'create',
  update: 'update',
} as const;

export type FormMode = typeof FormMode[keyof typeof FormMode];