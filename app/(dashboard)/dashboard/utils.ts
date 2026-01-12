import { COLUMN_VISIBILITY_PREFIX } from './constants';

export const updateColumnVisibility = (columnId: string, isVisible: boolean) => {
	const path = window.location.pathname;
	const storageKey = COLUMN_VISIBILITY_PREFIX + path;

	const stored = localStorage.getItem(storageKey);
	let visibilityColumns: Record<string, boolean> = {};

	if (stored) {
		try {
			visibilityColumns = JSON.parse(stored);
		} catch (error) {
			console.warn('Invalid visibility data in localStorage', error);
			localStorage.removeItem(storageKey);
		}
	}

	if (isVisible) {
		visibilityColumns[columnId] = true;
	} else {
		delete visibilityColumns[columnId];
	}

	if (Object.keys(visibilityColumns).length === 0) {
		localStorage.removeItem(storageKey);
	} else {
		localStorage.setItem(storageKey, JSON.stringify(visibilityColumns));
	}
};

export const formatCurrency = (amount: number) => {
	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return currencyFormatter.format(amount);
};

export const formatDate = (timestamp: number | string | Date) => {
	const date = new Date(timestamp);

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'medium',
		timeStyle: 'short',
	});

	return dateFormatter.format(date);
};
