'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  // Honeypot — must stay empty.
  _honey: z.string().max(0, 'Spam detected'),
});

type FormValues = z.infer<typeof schema>;

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setState('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setState('success');
        reset();
      } else {
        setState('error');
      }
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="font-display text-h3 font-semibold text-primary">
          Message received!
        </p>
        <p className="mt-2 text-body text-muted-foreground">
          We will get back to you within 1–2 business days.
        </p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => setState('idle')}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        {...register('_honey')}
        type="text"
        tabIndex={-1}
        aria-hidden
        className="sr-only"
        autoComplete="off"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name *" error={errors.name?.message}>
          <Input
            {...register('name')}
            id="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-err' : undefined}
          />
          {errors.name ? (
            <FieldError id="name-err">{errors.name.message}</FieldError>
          ) : null}
        </Field>
        <Field label="Email address *" error={errors.email?.message}>
          <Input
            {...register('email')}
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-err' : undefined}
          />
          {errors.email ? (
            <FieldError id="email-err">{errors.email.message}</FieldError>
          ) : null}
        </Field>
      </div>

      <Field label="Phone number (optional)">
        <Input
          {...register('phone')}
          id="phone"
          type="tel"
          placeholder="+880 …"
        />
      </Field>

      <Field label="Message *" error={errors.message?.message}>
        <Textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="How can we help you?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'msg-err' : undefined}
        />
        {errors.message ? (
          <FieldError id="msg-err">{errors.message.message}</FieldError>
        ) : null}
      </Field>

      {state === 'error' ? (
        <p role="alert" className="text-small text-destructive">
          Something went wrong. Please try again or contact us by phone.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        disabled={state === 'loading'}
      >
        {state === 'loading' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label
        htmlFor={undefined}
        className={error ? 'text-destructive' : undefined}
      >
        {label}
      </Label>
      {children}
    </div>
  );
}

function FieldError({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <p id={id} role="alert" className="text-small text-destructive">
      {children}
    </p>
  );
}
