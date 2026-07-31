import { supabase } from "@/lib/supabase";

export type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  options: string[];
};

export type FormSection = {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
};

export interface Form {
  id: string;
  form_type: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  message: string | null;
  status: string | null;
  slug: string | null;
  active: boolean;
  placement: string;
  description: string | null;
  sections: FormSection[];
  created_at: string;
  updated_at: string;
}

export async function getForms() {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data as Form[];
}

export async function getForm(id: string) {
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data as Form;
}

export async function createForm(
  name: string,
  slug: string,
  description: string,
  placement: string,
  sections: FormSection[]

) {
  const { data, error } = await supabase
    .from("forms")
   .insert({
  form_type: "custom",
  name,
  slug,
  description,
  placement,
  sections,
  active: false,
})
    .select()
    .single();

  if (error) throw error;

  return data as Form;
}


export async function updateForm(
  id: string,
  updates: Partial<
    Omit<Form, "id" | "created_at" | "updated_at">
  >
) {
  const { data, error } = await supabase
    .from("forms")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Form;
}

export async function deleteSubmission(id: string) {
  const { error } = await supabase
    .from("form_submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function deleteForm(id: string) {
  const { error: submissionsError } = await supabase
    .from("form_submissions")
    .delete()
    .eq("form_id", id);

  if (submissionsError) throw submissionsError;

  const { error: formError } = await supabase
    .from("forms")
    .delete()
    .eq("id", id);

  if (formError) throw formError;
}

export type FormSubmission = {
  id: string;
  form_id: string;
  data: Record<string, any>;
  submitted_at: string;
};

export async function getSubmissions(formId: string) {
  const { data, error } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("form_id", formId)
    .order("submitted_at", {
      ascending: false,
    });

  if (error) throw error;

  return data as FormSubmission[];
}

