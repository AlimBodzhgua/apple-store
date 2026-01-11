'use client';

import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import type { ChangeEvent } from 'react';

import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { COLUMN_VISIBILITY_PREFIX } from '../constants';
import { updateColumnVisibility } from '../utils';
import { DataTable } from './data-table';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchPlaceholder?: string;
}

export function SearchableDataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
	const {
		columns,
		data,
		searchPlaceholder = 'Search...',
	} = props;
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			globalFilter,
			columnFilters,
		},
	});

	useEffect(() => {
		const path = window.location.pathname;
		const storageKey = COLUMN_VISIBILITY_PREFIX + path;
		const stored = localStorage.getItem(storageKey);

		if (stored) {
			const invisibleColumns = JSON.parse(stored);
			table.getAllColumns().forEach((column) => {
				if (invisibleColumns[column.id]) {
					column.toggleVisibility(false);
				}
			});
		}
	}, []);

	const onSearch = (e: ChangeEvent<HTMLInputElement>) => setGlobalFilter(e.target.value);

	return (
		<>
			<div className='flex justify-between gap-4'>
				<Input
					placeholder={searchPlaceholder}
					className='mb-5'
					value={globalFilter}
					onChange={onSearch}
				/>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='outline' className='ml-auto'>
							Columns&nbsp;
							<ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) => {
											updateColumnVisibility(column.id, !value);

											column.toggleVisibility(!!value);
										}}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<DataTable table={table} />
		</>
	);
}
