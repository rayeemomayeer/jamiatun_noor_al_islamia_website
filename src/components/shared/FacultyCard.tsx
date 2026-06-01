import type { Locale } from '@/constants/i18n';
import { Placeholder } from '@/components/shared/Placeholder';
import { Card, CardContent } from '@/components/ui/card';
import type { Faculty } from '@/types/content';
import { pick } from '@/utils/localize';

export function FacultyCard({
  faculty,
  locale,
}: {
  faculty: Faculty;
  locale: Locale;
}) {
  const name = pick(faculty.name, locale);
  return (
    <Card className="overflow-hidden">
      <Placeholder label={name} className="aspect-square w-full" />
      <CardContent className="p-5 text-center">
        <h3 className="font-display text-h4 font-semibold text-primary">
          {name}
        </h3>
        <p className="mt-1 text-small text-muted-foreground">
          {pick(faculty.title, locale)}
        </p>
      </CardContent>
    </Card>
  );
}
