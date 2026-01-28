import { Header } from "@/components/layout/header";
import { RelatedContent } from "@/components/layout/related-content";
import { AdvertiseClient } from "./advertise-client";

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Header />
      
      <main className="container mx-auto max-w-4xl px-6 py-20">
        <AdvertiseClient />
        
        <div className="max-w-[720px] mx-auto">
          <RelatedContent title="Entdecke unsere neuesten Strategien" />
        </div>
      </main>
    </div>
  );
}
