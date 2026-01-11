'use client';

import type { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
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
	})
	
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
						<Button variant="outline" className="ml-auto">
						Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
						.getAllColumns()
						.filter((column) => column.getCanHide())
						.map((column) => {
							return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
								column.toggleVisibility(!!value)
								}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
							)
						})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<DataTable table={table} />
		</>
	);
}