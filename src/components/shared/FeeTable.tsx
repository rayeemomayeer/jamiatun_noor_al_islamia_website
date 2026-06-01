import type { Locale } from '@/constants/i18n';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FEE_TABLE } from '@/data/fees';
import { pick } from '@/utils/localize';

/** Responsive fee comparison table (BLUEPRINT §2.7, §13.3). */
export function FeeTable({ locale }: { locale: Locale }) {
  const { caption, rows } = FEE_TABLE;

  return (
    <Table>
      <TableCaption>{pick(caption, locale)}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Item</TableHead>
          <TableHead scope="col" className="text-end">
            Kitab
          </TableHead>
          <TableHead scope="col" className="text-end">
            Hifz
          </TableHead>
          <TableHead scope="col" className="text-end">
            General
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-semibold">
              {pick(row.item, locale)}
            </TableCell>
            <TableCell className="text-end">{row.kitab ?? '—'}</TableCell>
            <TableCell className="text-end">{row.hifz ?? '—'}</TableCell>
            <TableCell className="text-end">{row.general ?? '—'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
