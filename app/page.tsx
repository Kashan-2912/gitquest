import { BugReportForm } from "@/components/forms/github-form";

export default function Page() {
return <main className="flex flex-col items-center justify-center h-screen">
    {/* <div className="flex items-center justify-center gap-2 w-full"> */}
        <BugReportForm />
    {/* </div> */}
</main>;
}