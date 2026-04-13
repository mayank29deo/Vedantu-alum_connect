import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AlumniStatus = "pending" | "approved" | "rejected";

export interface AlumniProfile {
  id?: string;
  created_at?: string;
  status?: AlumniStatus;
  reviewer_note?: string;

  // Personal
  full_name: string;
  email: string;
  phone?: string;
  profile_photo_url?: string;

  // Vedantu journey
  vedantu_study_years: string;
  vedantu_classes: string;
  vedantu_subjects?: string[];

  // Education
  college_name: string;
  degree: string;
  college_year_of_passing?: number;

  // Current
  current_company?: string;
  current_role?: string;
  current_city?: string;
  field: string;
  specialization?: string;

  // Achievement
  exam_cleared?: string;
  rank_or_result?: string;

  // Profile
  bio?: string;
  linkedin_url?: string;
  tags?: string[];

  // Mentorship
  available_for_mentoring?: boolean;
  session_preference?: "1on1" | "group" | "both";
  preferred_session_duration?: number;

  referral_source?: string;
}

export async function submitAlumniProfile(
  data: AlumniProfile,
  photoFile?: File
): Promise<{ success: boolean; error?: string }> {
  try {
    let profile_photo_url: string | undefined;

    // Upload photo first if provided
    if (photoFile) {
      const ext = photoFile.name.split(".").pop();
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("alumni-photos")
        .upload(filename, photoFile, { upsert: false });

      if (uploadError) throw new Error("Photo upload failed: " + uploadError.message);

      const { data: urlData } = supabase.storage
        .from("alumni-photos")
        .getPublicUrl(filename);

      profile_photo_url = urlData.publicUrl;
    }

    const { error } = await supabase
      .from("alumni_profiles")
      .insert({ ...data, profile_photo_url, status: "pending" });

    if (error) throw new Error(error.message);
    return { success: true };
  } catch (e: unknown) {
    return { success: false, error: (e as Error).message };
  }
}

export async function fetchAllAlumni(serviceKey?: string) {
  // For admin: use service key to bypass RLS
  const client = serviceKey
    ? createClient(supabaseUrl, serviceKey)
    : supabase;

  const { data, error } = await client
    .from("alumni_profiles")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
}

export async function updateAlumniStatus(
  id: string,
  status: AlumniStatus,
  reviewer_note?: string
) {
  const { error } = await supabase
    .from("alumni_profiles")
    .update({ status, reviewer_note, reviewed_at: new Date().toISOString() })
    .eq("id", id);
  return { error };
}
