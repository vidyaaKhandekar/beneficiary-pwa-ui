interface FilterOption {
	id: number;
	label: string;
	value: string;
}
export const Gender: FilterOption[] = [
	{ id: 1, label: 'Male', value: 'male' },
	{ id: 2, label: 'Female', value: 'female' },
	{ id: 3, label: 'Both', value: 'both' },
];
export const IncomeRange: FilterOption[] = [
	{ id: 1, label: 'All', value: '' },
	{ id: 2, label: 'Below 1,00,000', value: '0-100000' },
	{ id: 3, label: 'Below 2,50,000', value: '0-250000' },
	{ id: 4, label: 'Below 5,00,000', value: '0-500000' },
	{ id: 5, label: 'Below 7,50,000', value: '0-750000' },
];
export const Castes: FilterOption[] = [
	{ id: 1, label: 'All', value: '' },
	{ id: 2, label: 'SC', value: 'sc' },
	{ id: 3, label: 'ST', value: 'st' },
	{ id: 4, label: 'OBC', value: 'obc' },
	{ id: 5, label: 'General', value: 'general' },
];
export const BenefitAmount: FilterOption[] = [
	{ id: 1, label: '12,000', value: '12000' },
	{ id: 2, label: '35,000', value: '35000' },
];
