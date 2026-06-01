import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Download } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArchCard } from '@/components/shared/ArchCard';
import { Divider } from '@/components/shared/Divider';
import { IslamicFrame } from '@/components/shared/IslamicFrame';

export const metadata: Metadata = {
  title: 'Design System',
  robots: { index: false },
};

type PageParams = { params: Promise<{ locale: string }> };

export default async function PlaygroundPage({ params }: PageParams) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container space-y-16 py-16">
      <header className="space-y-2">
        <p className="text-eyebrow uppercase text-muted-foreground">
          BLUEPRINT §7 · Phase 2
        </p>
        <h1 className="font-display text-display font-bold text-primary">
          Design System
        </h1>
        <p className="text-body-lg text-muted-foreground">
          Token playground — primitives + ornaments, LTR and RTL.
        </p>
      </header>

      <Section title="Color tokens">
        <div className="flex flex-wrap gap-4">
          <Swatch name="parchment" className="bg-background" />
          <Swatch name="parchment-deep" className="bg-parchment-deep" />
          <Swatch name="primary" className="bg-primary" dark />
          <Swatch name="primary-dark" className="bg-primary-dark" dark />
          <Swatch name="primary-darkest" className="bg-primary-darkest" dark />
          <Swatch name="accent (gold)" className="bg-accent" />
          <Swatch name="accent-soft" className="bg-accent-soft" />
          <Swatch name="muted" className="bg-muted" />
          <Swatch name="border" className="bg-border" />
        </div>
      </Section>

      <Section title="Typography scale">
        <div className="space-y-2">
          <p className="font-display text-display text-primary">Display 60</p>
          <p className="font-display text-h1 text-primary">Heading 1</p>
          <p className="font-display text-h2 text-primary">Heading 2</p>
          <p className="font-display text-h3 text-primary">Heading 3</p>
          <p className="text-body-lg">Lead paragraph — body large.</p>
          <p className="text-body">Default body text on parchment.</p>
          <p className="text-small text-muted-foreground">Small / caption.</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Apply for Admission</Button>
          <Button variant="secondary">View Departments</Button>
          <Button variant="donate">Donate Now</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge variant="emerald">Emerald</Badge>
          <Badge variant="gold">Gold</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="soft">Soft</Badge>
        </div>
      </Section>

      <Section title="Form controls">
        <div className="grid max-w-md gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" placeholder="e.g. Aisha Rahman" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="msg">Message</Label>
            <Textarea id="msg" placeholder="Your enquiry…" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="err">Invalid example</Label>
            <Input id="err" aria-invalid defaultValue="bad@" />
          </div>
        </div>
      </Section>

      <Section title="Card & IslamicFrame">
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Plain Card</CardTitle>
              <CardDescription>Parchment surface, soft shadow.</CardDescription>
            </CardHeader>
            <CardContent className="text-body text-muted-foreground">
              Equal-height card body content sits here.
            </CardContent>
          </Card>
          <IslamicFrame>
            <div className="p-6">
              <h3 className="font-display text-h3 font-semibold text-primary">
                Framed Feature
              </h3>
              <p className="mt-2 text-body text-muted-foreground">
                Gold ornamental border with corner flourishes.
              </p>
            </div>
          </IslamicFrame>
        </div>
      </Section>

      <Section title="ArchCard (departments)">
        <div className="grid gap-8 sm:grid-cols-3">
          {['Kitab', 'Hifz', 'General'].map((d) => (
            <ArchCard
              key={d}
              imageSrc="/logo.svg"
              imageAlt={`${d} department`}
              title={d}
              description="Short department description."
              action={
                <Button size="sm" variant="secondary">
                  <Download /> Syllabus
                </Button>
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Divider">
        <Divider />
      </Section>

      <Section title="Tabs">
        <Tabs defaultValue="req">
          <TabsList>
            <TabsTrigger value="req">Requirements</TabsTrigger>
            <TabsTrigger value="dates">Key Dates</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
          </TabsList>
          <TabsContent value="req">Admission requirements panel.</TabsContent>
          <TabsContent value="dates">Key dates panel.</TabsContent>
          <TabsContent value="fees">Fee structure panel.</TabsContent>
        </Tabs>
      </Section>

      <Section title="Accordion">
        <Accordion type="single" collapsible className="max-w-xl">
          <AccordionItem value="a">
            <AccordionTrigger>What programs are offered?</AccordionTrigger>
            <AccordionContent>
              Kitab, Hifz, and General classes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>How do I apply?</AccordionTrigger>
            <AccordionContent>
              Submit the admission enquiry form.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Section title="Table (fees)">
        <Table className="max-w-xl">
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="text-end">Amount (BDT)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Admission fee</TableCell>
              <TableCell className="text-end">5,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Monthly tuition</TableCell>
              <TableCell className="text-end">2,500</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total (first month)</TableCell>
              <TableCell className="text-end">7,500</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Section>

      <Section title="Progress (transparency)">
        <div className="max-w-md space-y-2">
          <div className="flex justify-between text-small">
            <span>Scholarships</span>
            <span>72%</span>
          </div>
          <Progress value={72} aria-label="Scholarships funded" />
        </div>
      </Section>

      <Section title="Overlays">
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Faculty Profile</DialogTitle>
                <DialogDescription>
                  Dialog content with focus trap and Esc-to-close.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Open Sheet</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Slide-in drawer (mobile nav).</SheetDescription>
            </SheetContent>
          </Sheet>
        </div>
      </Section>

      <Section title="RTL mirror check (dir=rtl)">
        <div
          dir="rtl"
          lang="ar"
          className="space-y-4 rounded-lg border border-border bg-parchment-deep p-6"
        >
          <p className="text-body-lg text-primary">
            تُعرض هذه الكتلة باتجاه من اليمين إلى اليسار للتحقق من الانعكاس.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">
              <Download /> تحميل
            </Button>
            <Button variant="donate">تبرّع الآن</Button>
            <Badge variant="gold">مميّز</Badge>
          </div>
          <Tabs defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">المتطلبات</TabsTrigger>
              <TabsTrigger value="two">المواعيد</TabsTrigger>
            </TabsList>
            <TabsContent value="one">لوحة المتطلبات.</TabsContent>
            <TabsContent value="two">لوحة المواعيد.</TabsContent>
          </Tabs>
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-h2 font-semibold text-primary">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({
  name,
  className,
  dark,
}: {
  name: string;
  className: string;
  dark?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`size-20 rounded-md border border-border shadow-sm ${className}`}
      />
      <span className="text-small text-muted-foreground">{name}</span>
      {dark ? <span className="sr-only">dark surface</span> : null}
    </div>
  );
}
