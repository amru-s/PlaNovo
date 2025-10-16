import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SrsGenerator } from "@/components/srs-generator";

export default async function SrsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-planovo-dark mb-4 font-syne">
                AI Requirements Analyst
              </h1>
              <p className="text-lg text-planovo-secondary font-outfit">
                Transform your feature ideas into comprehensive Software Requirements Specifications
              </p>
            </div>
            
            <SrsGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}