import { initSupabase } from '@/lib/init-supabase';
import { SourcesService } from '@/services/sources-service';

export const mockSourcesService = () =>
  new SourcesService(
    initSupabase({
      key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjam1wZGZ3cGh5b2Jwb3h6ZmVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwMzgzODEsImV4cCI6MTk2MDYxNDM4MX0.0EYr9kBj17GkbfeXzgFnzsFEulcytOcTFD_zOfuPkd4',
      url: 'https://ccjmpdfwphyobpoxzfel.supabase.co',
    }),
  );
