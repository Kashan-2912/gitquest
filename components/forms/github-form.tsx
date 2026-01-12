"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { fetchGithubStats } from "@/server/ai";

const formSchema = z.object({
  githubProfileUrl: z.string().startsWith("https://github.com/"),
});

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubProfileUrl: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const stats = await fetchGithubStats(data.githubProfileUrl);
    console.log(stats)
    toast.success("Github stats fetched successfully!");
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="githubProfileUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2">
                    <Input
                      {...field}
                      id="form-rhf-demo-github-profile-url"
                      aria-invalid={fieldState.invalid}
                      placeholder="https://github.com/username"
                      autoComplete="off"
                    />
                    <Button type="submit" form="form-rhf-demo">
                      Submit
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
