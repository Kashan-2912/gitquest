import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
return <main className="flex flex-col items-center justify-center h-screen">
    <div className="flex items-center gap-2">
        <Input />
        <Button>Submit</Button>
    </div>
</main>;
}