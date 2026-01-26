import type { FormStateType } from '@/shared/types';

export type DashboardFormsStateErrors = {
	name?: string[];
	slug?: string[];
	description?: string[];
	price?: string[];
	hexCode?: string[];
	file?: string[];
	colorId?: string[];
	categoryId?: string[];
	general?: string;
};

export type DashboardFormsStateType = FormStateType<DashboardFormsStateErrors>;
